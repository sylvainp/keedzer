import MusicServicePort from '../../../src/domain/ports/MusicServicePort';
import GetUserInfoUsecase from '../../../src/domain/usecases/GetUserInfoUsecase';
import MusicServiceMockAdapter from '../../mocks/MusicServiceMockAdapter';
import UserEntity from '../../../src/domain/entities/User.entity';

describe('GetUserInfoUsecase', () => {
  const mockUserEntity = new UserEntity(
    '1',
    'familyName',
    'firstName',
    'imageUrl',
  );
  let mockMusicService: MusicServicePort;
  let usecase: GetUserInfoUsecase;

  beforeAll(() => {
    mockMusicService = new MusicServiceMockAdapter();
    usecase = new GetUserInfoUsecase(mockMusicService);
  });

  afterEach(() => jest.clearAllMocks());

  it('usecase execute must call adapter function', async () => {
    expect.assertions(1);
    jest
      .spyOn(mockMusicService, 'getUserInfo')
      .mockResolvedValue(mockUserEntity);
    await usecase.execute();
    expect(mockMusicService.getUserInfo).toHaveBeenCalledTimes(1);
  });

  it('usecase execute must return userEntity returned by adapter', async () => {
    expect.assertions(2);
    jest
      .spyOn(mockMusicService, 'getUserInfo')
      .mockResolvedValue(mockUserEntity);
    const result: UserEntity | Error = await usecase.execute();
    expect(result instanceof UserEntity).toBe(true);
    expect(result).toStrictEqual(mockUserEntity);
  });

  it('usecase execute must return an error if musicService getUserInfo throw an error', async () => {
    // expect.assertions(2);
    jest
      .spyOn(mockMusicService, 'getUserInfo')
      .mockRejectedValue('Unable to get user info');
    const result: UserEntity | Error = await usecase.execute();
    expect(result instanceof Error).toBe(true);
    expect(result).toStrictEqual(
      new Error(
        'Une erreur est survenue lors de la récupération des informations',
      ),
    );
  });
});
