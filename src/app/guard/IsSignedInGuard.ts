import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class IsSignedInGuard {
  // here you can inject your auth service to check that user is signed in or not
  constructor(private loginService: AuthenticationService, private router: Router, private toastrService: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(["/product"]).then();
      this.toastrService.info("User Already Logged In !!", '', {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
      });
      return false;
    }
    return true;
  }
}
