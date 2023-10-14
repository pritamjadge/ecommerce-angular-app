import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageNotFoundService {

  private _navBarStatusOn404 = new BehaviorSubject<boolean>(true);

  getNavBarStatusOn404() {
    this._navBarStatusOn404.asObservable();
    console.log("getNavBarStatusOn404 :"+this._navBarStatusOn404.value);
    return this._navBarStatusOn404;
  }

  setNavBarStatusOn404(value:boolean) {
    this._navBarStatusOn404.next(value);
    console.log("setNavBarStatusOn404 :"+this._navBarStatusOn404.value);
  }
}
