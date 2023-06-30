import UserEntity from '../../src/domain/entities/User.entity';
import MusicServicePort from '../../src/domain/ports/MusicServicePort';

export default class MusicServiceMockAdapter implements MusicServicePort {
  getUserInfo(): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  getAlbums(_page: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getAlbum(_albumId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
