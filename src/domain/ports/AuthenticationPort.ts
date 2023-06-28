interface AuthenticationPort {
  login(): Promise<{accessToken: string}>;
}

export default AuthenticationPort;
