import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthGuard {

  constructor(private loginService: AuthenticationService, private router: Router, private toast: ToastrService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']).then(result => {
        this.toast.info("User must login first.")
      });
      return false;
    }
  }
}
