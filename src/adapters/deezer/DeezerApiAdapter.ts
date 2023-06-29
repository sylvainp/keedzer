import UserEntity from '../../domain/entities/UserEntity';
import MusicServicePort from '../../domain/ports/MusicServicePort';
import DeezerUserModel from './models/DeezerUser.model';

export default class DeezerApiAdapter implements MusicServicePort {
  private readonly baseUrl: string = 'https://api.deezer.com/user/';
  private _accessToken: string | null = null;

  set accessToken(value: string) {
    this._accessToken = value;
  }

  async getUserInfo(): Promise<UserEntity> {
    if (!this._accessToken) {
      throw new Error('Access token required !');
    }
    const url = `${this.baseUrl}/me?access_token=${this._accessToken}`;
    const request = new Request(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch(request);
    if (response.status === 200) {
      const responseJson: DeezerUserModel = await response.json();
      console.log({responseJson});
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

  getAlbums(page: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getAlbum(albumId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
