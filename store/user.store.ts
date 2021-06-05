import { observable, action, makeAutoObservable } from 'mobx';

export default class UserStore {
  @observable username = null;
  @observable accessToken = null;

  constructor(private authService) {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      this.accessToken = window.localStorage.getItem('accessToken');
    }
  }

  @action
  async signin(username, password) {
    const [user, accessToken] = await this.authService.signin(
      username,
      password,
    );
    this.username = user;
    this.accessToken = accessToken;
  }

  @action
  async signup(username, password) {
    return this.authService.signup(username, password);
  }

  @action
  signout() {
    this.username = null;
    this.authService.removeToken();
  }
}
