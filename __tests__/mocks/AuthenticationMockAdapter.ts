import AuthenticationPort from '../../src/domain/ports/AuthenticationPort';

class AuthenticationMockAdapter implements AuthenticationPort {
  login(): Promise<{accessToken: string}> {
    return Promise.resolve({accessToken: ''});
  }
}

export default AuthenticationMockAdapter;
