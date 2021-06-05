import { observable, action, makeAutoObservable } from 'mobx';

export default class UserStore {
  @observable username = null;

  constructor(private authService) {
    makeAutoObservable(this);
  }

  @action
  async signin(username, password) {
    this.username = await this.authService.signin(username, password);
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
