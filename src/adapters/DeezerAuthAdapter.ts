import AuthenticationPort from '../domain/ports/AuthenticationPort';
import {DEEZER_APP_ID, DEEZER_REDIRECT_URL} from 'react-native-dotenv';

class DeezerAuthAdapter implements AuthenticationPort {
  private base_url =
    'https://connect.deezer.com/oauth/auth.php?perms=basic_access,email';

  async login(): Promise<{accessToken: string}> {
    const authUrl = `${
      this.base_url
    }&app_id=${DEEZER_APP_ID}&redirect_uri=${encodeURIComponent(
      DEEZER_REDIRECT_URL,
    )}`;
    try {
      const request = new Request(authUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const response = await fetch(request);
      if (response.status === 200) {
        const responseJson = await response.json();
        return Promise.resolve({accessToken: 'plop'});
      } else {
        return Promise.resolve({accessToken: 'plip'});
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export default DeezerAuthAdapter;
