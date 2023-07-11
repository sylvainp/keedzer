import AlbumEntity from '../../../domain/entities/Album.entity';
import TrackEntity from '../../../domain/entities/Track.entity';
import UserEntity from '../../../domain/entities/User.entity';
import MusicServicePort from '../../../domain/ports/MusicServicePort';
import DeezerResponseAlbumModel from './models/DeezerResponseAlbum.model';
import DeezerTrackModel from './models/DeezerTrack.model';
import DeezerUserModel from './models/DeezerUser.model';
import deezerAlbumModelToDomain from './models/deezerAlbumModelToDomain';
import deezerTrackModelToDomain from './models/deezerTrackModelToDomain';
import deezerUserModelToDomain from './models/deezerUserModelToDomain';

export default class DeezerApiAdapter implements MusicServicePort {
  private readonly baseUrl: string = 'https://api.deezer.com/';
  private _accessToken: string | null = null;
  private _userId: string | null = null;

  private readonly record_per_page = 25;
  set accessToken(value: string) {
    this._accessToken = value;
  }

  set userId(value: string) {
    this._userId = value;
  }

  private buildRequest(url: string): Request {
    return new Request(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async getUserInfo(): Promise<UserEntity> {
    if (!this._accessToken) {
      throw new Error('Access token required !');
    }
    const url = `${this.baseUrl}/user/me?access_token=${this._accessToken}`;
    const request = this.buildRequest(url);

    const response = await fetch(request);
    if (response.status === 200) {
      const responseJson: DeezerUserModel = await response.json();
      return deezerUserModelToDomain(responseJson);
    } else {
      throw {code: response.status, message: response.statusText};
    }
  }

  async getAlbums(
    page: number,
  ): Promise<{data: AlbumEntity[]; hasNext: boolean}> {
    if (!this._accessToken) {
      throw new Error('Access token required !');
    }
    if (!this._userId) {
      throw new Error('User id required');
    }

    const url = `${this.baseUrl}/user/${this._userId}/albums?access_token=${
      this._accessToken
    }&index=${page * this.record_per_page}&limit=${this.record_per_page}`;
    const request = this.buildRequest(url);
    const response = await fetch(request);
    if (response.status === 200) {
      const responseJson: DeezerResponseAlbumModel = await response.json();

      return {
        hasNext: responseJson.next !== undefined,
        data: responseJson.data.map(item => deezerAlbumModelToDomain(item)),
      };
    } else {
      throw {code: response.status, message: response.statusText};
    }
  }
  async getAlbumTracks(albumId: string): Promise<TrackEntity[]> {
    if (!this._accessToken) {
      throw new Error('Access token required !');
    }
    const url = `${this.baseUrl}/album/${albumId}/tracks?access_token=${this._accessToken}`;
    const request = this.buildRequest(url);
    const response = await fetch(request);
    if (response.status === 200) {
      const responseJson: {data: DeezerTrackModel[]} = await response.json();
      return responseJson.data.map(item => deezerTrackModelToDomain(item));
    } else {
      throw {code: response.status, message: response.statusText};
    }
  }
}
