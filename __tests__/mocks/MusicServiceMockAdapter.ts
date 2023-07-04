import TrackEntity from '../../src/domain/entities/Track.entity';
import UserEntity from '../../src/domain/entities/User.entity';
import MusicServicePort from '../../src/domain/ports/MusicServicePort';

export default class MusicServiceMockAdapter implements MusicServicePort {
  getAlbumTracks(_albumId: string): Promise<TrackEntity[]> {
    throw new Error('Method not implemented.');
  }
  getUserInfo(): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  getAlbums(_page: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
