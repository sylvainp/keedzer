import AlbumEntity from '../../domain/entities/Album.entity';
import ArtistEntity from '../../domain/entities/Artist.entity';
import UserEntity from '../../domain/entities/User.entity';
import MusicServicePort from '../../domain/ports/MusicServicePort';
import DeezerResponseAlbumModel from './models/DeezerResponseAlbum.model';
import DeezerUserModel from './models/DeezerUser.model';

export default class DeezerApiAdapter implements MusicServicePort {
  private readonly baseUrl: string = 'https://api.deezer.com/user';
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
    const url = `${this.baseUrl}/me?access_token=${this._accessToken}`;
    const request = this.buildRequest(url);

    const response = await fetch(request);
    if (response.status === 200) {
      const responseJson: DeezerUserModel = await response.json();
      return new UserEntity(
        `${responseJson.id}`,
        responseJson.lastname ?? 'N/C',
        responseJson.firstname ?? 'N/C',
        responseJson.picture_small ?? 'N/C',
      );
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

    const url = `${this.baseUrl}/${this._userId}/albums?access_token=${
      this._accessToken
    }&index=${page * this.record_per_page}&limit=${this.record_per_page}`;
    const request = this.buildRequest(url);
    const response = await fetch(request);
    if (response.status === 200) {
      const responseJson: DeezerResponseAlbumModel = await response.json();

      return {
        hasNext: responseJson.next !== undefined,
        data: responseJson.data.map(
          item =>
            new AlbumEntity(
              `${item.id}`,
              new ArtistEntity(`${item.artist.id}`, item.artist.name),
              item.cover_medium,
              item.cover_big,
              item.title,
            ),
        ),
      };
    } else {
      throw {code: response.status, message: response.statusText};
    }
  }
  getAlbum(albumId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
