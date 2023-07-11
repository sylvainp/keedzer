import RNTrackPlayer from '../adapters/primaries/RNTrackPlayer/RNTrackPlayer';
import DeezerApiAdapter from '../adapters/secondaries/deezer/DeezerApiAdapter';
import GetAlbumsTracks from '../domain/usecases/GetAlbumsTracks';
import GetAlbumsUsecase from '../domain/usecases/GetAlbumsUsecase';
import GetUserInfoUsecase from '../domain/usecases/GetUserInfoUsecase';
import {ConfigContextValueType} from './configurationContextTypes';

const getConfigContextValue = (
  accessToken: string | null = null,
  userId: string | null = null,
): ConfigContextValueType => {
  const playerService = new RNTrackPlayer();

  const musicService = new DeezerApiAdapter();
  if (accessToken) {
    musicService.accessToken = accessToken;
  }
  if (userId) {
    musicService.userId = userId;
    playerService.prepare();
  }
  const getUserInfoUsecase = new GetUserInfoUsecase(musicService);
  const getAlbumsUsecase = new GetAlbumsUsecase(musicService);
  const getAlbumsTracks = new GetAlbumsTracks(musicService);
  return {getUserInfoUsecase, getAlbumsUsecase, getAlbumsTracks, playerService};
};

export default getConfigContextValue;
