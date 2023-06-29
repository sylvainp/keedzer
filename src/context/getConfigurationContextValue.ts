import DeezerApiAdapter from '../adapters/deezer/DeezerApiAdapter';
import GetUserInfoUsecase from '../domain/usecases/GetUserInfoUsecase';
import {ConfigContextValueType} from './configurationContextTypes';

const getConfigContextValue = (
  accessToken: string | null = null,
): ConfigContextValueType => {
  const musicService = new DeezerApiAdapter();
  if (accessToken) {
    musicService.accessToken = accessToken;
  }
  const getUserInfoUsecase = new GetUserInfoUsecase(musicService);
  return {getUserInfoUsecase};
};

export default getConfigContextValue;
