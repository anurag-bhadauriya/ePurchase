import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user-id';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  signOut() {
    sessionStorage.clear();
  }

  public saveToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserKey(userKey: string){
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, userKey);
  }

  public getUserKey(){
    return sessionStorage.getItem(USER_KEY);
  }

}