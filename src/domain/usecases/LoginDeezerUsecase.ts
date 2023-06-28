import AuthenticationPort from '../ports/AuthenticationPort';

class LoginDeezerUsecase {
  constructor(private readonly authPort: AuthenticationPort) {}

  async execute(): Promise<string | Error> {
    try {
      const result = await this.authPort.login();
      return Promise.resolve(result.accessToken);
    } catch (e) {
      return Promise.resolve(new Error('Unable to login'));
    }
  }
}

export default LoginDeezerUsecase;
