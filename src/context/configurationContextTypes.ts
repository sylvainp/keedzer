import GetAlbumsUsecase from '../domain/usecases/GetAlbumsUsecase';
import GetUserInfoUsecase from '../domain/usecases/GetUserInfoUsecase';

export interface ConfigContextValueType {
  getUserInfoUsecase: GetUserInfoUsecase;
  getAlbumsUsecase: GetAlbumsUsecase;
}
