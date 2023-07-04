import AlbumEntity from '../entities/Album.entity';
import TrackEntity from '../entities/Track.entity';
import UserEntity from '../entities/User.entity';

export default interface MusicServicePort {
  getUserInfo(): Promise<UserEntity>;
  getAlbums(page: number): Promise<{data: AlbumEntity[]; hasNext: boolean}>;
  getAlbumTracks(albumId: string): Promise<TrackEntity[]>;
}
