import DeezerAlbumModel from './DeezerAlbum.model';

export default interface DeezerResponseAlbumModel {
  data: DeezerAlbumModel[];
  checksum: string;
  total: number;
  next: string;
}
