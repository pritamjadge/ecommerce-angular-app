import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {PageNotFoundService} from "../services/page-not-found.service";

@Injectable({
  providedIn: 'root'
})
export class PageNotFoundActivateGuard implements CanActivate {

  constructor(private pageNotFoundService: PageNotFoundService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.pageNotFoundService.setNavBarStatusOn404(false);
    return true;
  }

}
