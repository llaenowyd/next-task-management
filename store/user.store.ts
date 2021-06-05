import { observable, action, makeAutoObservable } from 'mobx';

export default class UserStore {
  @observable accessToken = null;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      this.accessToken = window.localStorage.getItem('accessToken');
    }
  }

  @action
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }
}
