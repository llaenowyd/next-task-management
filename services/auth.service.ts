import axios from 'axios';
import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
  async signin(username, password) {
    const result = await axios.post(`${this.BASE_URL}/auth/signin`, {
      username,
      password,
    });
    const accessToken = result.data.accessToken;
    this.saveToken(accessToken);
    return [result.data.username, result.data.accessToken];
  }

  async signup(username, password) {
    await axios.post(`${this.BASE_URL}/auth/signup`, { username, password });
  }

  async signout() {
    this.removeToken();
  }
}
