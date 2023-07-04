import AlbumEntity from '../entities/Album.entity';
import UserEntity from '../entities/User.entity';

export default interface MusicServicePort {
  getUserInfo(): Promise<UserEntity>;
  getAlbums(page: number): Promise<{data: AlbumEntity[]; hasNext: boolean}>;
  getAlbum(albumId: string): Promise<any | Error>;
}
