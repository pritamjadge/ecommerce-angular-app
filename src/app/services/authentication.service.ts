import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../models/LoginResponse";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../models/User";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: String = 'http://localhost:8080/api/auth';

  private _loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  private _username = new BehaviorSubject<string>(localStorage.getItem('username')!);

  constructor(private _http: HttpClient, private _router: Router) {

  }

  public callApi() {
    return this._http.get(`http://localhost:8080/api/test/admin`);
  }

  refreshToken(token: string) {
    return this._http.post(`${this.baseUrl}/refreshToken`, {
      refreshToken: token
    }, httpOptions);
  }

  public login(loginData: LoginResponse): Observable<any> {
    return this._http.post(`${this.baseUrl}/signIn`, loginData);
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    return !(token === null || token === '' || token === undefined);
  }

  signUp(user: User): Observable<any> {
    return this._http.post(`${this.baseUrl}/signUp`, user);
  }

  logout() {
    localStorage.clear();
    this._loggedInStatus.next(false);
    this._router.navigate(['login']).then();
  }

  // getter and setter

  getLoggedInStatus() {
    return this._loggedInStatus.asObservable();
  }

  setLoggedInStatus(value: boolean) {
    this._loggedInStatus.next(value);
  }

  getUsername() {
    return this._username.asObservable();
  }

  setUsername(value: string) {
    this._username.next(value);
  }

}
