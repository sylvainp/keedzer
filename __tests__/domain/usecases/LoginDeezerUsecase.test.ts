import AuthenticationPort from '../../../src/domain/ports/AuthenticationPort';
import LoginDeezerUsecase from '../../../src/domain/usecases/LoginDeezerUsecase';
import AuthenticationMockAdapter from '../../mocks/AuthenticationMockAdapter';

describe('LoginDeezerUsecase', () => {
  let usecase: LoginDeezerUsecase;
  let mockAdapter: AuthenticationPort;
  beforeAll(() => {
    mockAdapter = new AuthenticationMockAdapter();
    usecase = new LoginDeezerUsecase(mockAdapter);
  });

  it('execute must call adapter login function', async () => {
    expect.assertions(1);
    jest.spyOn(mockAdapter, 'login').mockResolvedValue({accessToken: ''});
    await usecase.execute();
    expect(mockAdapter.login).toHaveBeenCalledTimes(1);
  });

  it('execute must return adapter access token result if success', async () => {
    expect.assertions(1);
    const expectedAccessToken = 'access_token';
    jest
      .spyOn(mockAdapter, 'login')
      .mockResolvedValue({accessToken: expectedAccessToken});
    const result = await usecase.execute();
    expect(result).toStrictEqual(expectedAccessToken);
  });

  it('execute must return an error if adapter throw an error', async () => {
    expect.assertions(2);
    jest
      .spyOn(mockAdapter, 'login')
      .mockRejectedValue(new Error('cannot login'));
    const result = await usecase.execute();
    expect(result instanceof Error).toBe(true);
    expect(result).toStrictEqual(new Error('Unable to login'));
  });
});
