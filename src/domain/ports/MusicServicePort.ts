import UserEntity from '../entities/UserEntity';

export default interface MusicServicePort {
  getUserInfo(): Promise<UserEntity>;
  getAlbums(page: number): Promise<any | Error>;
  getAlbum(albumId: string): Promise<any | Error>;
}
