import {PlayerPort} from '../domain/ports/PlayerPort';
import GetAlbumsTracks from '../domain/usecases/GetAlbumsTracks';
import GetAlbumsUsecase from '../domain/usecases/GetAlbumsUsecase';
import GetUserInfoUsecase from '../domain/usecases/GetUserInfoUsecase';

export interface ConfigContextValueType {
  getUserInfoUsecase: GetUserInfoUsecase;
  getAlbumsUsecase: GetAlbumsUsecase;
  getAlbumsTracks: GetAlbumsTracks;
  playerService: PlayerPort;
}
