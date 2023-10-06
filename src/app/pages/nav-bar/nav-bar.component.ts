import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn!: Observable<boolean>;
  firstName!: Observable<string>;
  cartCount!: Observable<number>;

  constructor(private _authService: AuthenticationService, private _toastrService: ToastrService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this._authService.getLoggedInStatus();
    this.firstName = this._authService.getFirstName();
    this.setProductCartCount();
    this.cartCount = this.cartService.getAddToCartCount();
  }


  logout() {
    this._authService.logout();
    this.cartService.setAddToCartCount(0);
    this._toastrService.success('Logout Successfully !');
  }

  private setProductCartCount() {
    if (this._authService.isLoggedIn()) {
      this.cartService.getCartCount(this._authService.getUserName()).subscribe(count => {
        this.cartService.setAddToCartCount(count);
      });
    }
  }

}
