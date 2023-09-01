import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public setToken(token: string): void {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.removeItem('refreshToken');
    localStorage.setItem('refreshToken', refreshToken);
    console.log("setRefreshToken : "+localStorage.getItem('refreshToken'));
  }

  public getRefreshToken(): string | null {
    console.log("getRefreshToken : "+localStorage.getItem('refreshToken'));
    return localStorage.getItem('refreshToken');
  }

}
