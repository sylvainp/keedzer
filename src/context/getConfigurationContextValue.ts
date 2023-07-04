import DeezerApiAdapter from '../adapters/deezer/DeezerApiAdapter';
import GetAlbumsUsecase from '../domain/usecases/GetAlbumsUsecase';
import GetUserInfoUsecase from '../domain/usecases/GetUserInfoUsecase';
import {ConfigContextValueType} from './configurationContextTypes';

const getConfigContextValue = (
  accessToken: string | null = null,
  userId: string | null = null,
): ConfigContextValueType => {
  const musicService = new DeezerApiAdapter();
  if (accessToken) {
    musicService.accessToken = accessToken;
  }
  if (userId) {
    musicService.userId = userId;
  }
  const getUserInfoUsecase = new GetUserInfoUsecase(musicService);
  const getAlbumsUsecase = new GetAlbumsUsecase(musicService);
  return {getUserInfoUsecase, getAlbumsUsecase};
};

export default getConfigContextValue;
