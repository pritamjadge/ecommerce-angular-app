import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn!: Observable<boolean>;
  userName!: Observable<string>;
  cartCount!: Observable<number>;

  constructor(private _authService: AuthenticationService, private _toastrService: ToastrService, private _productService: ProductService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this._authService.getLoggedInStatus();
    this.userName = this._authService.getUsername();
    this.cartCount = this._productService.getAddToCartCount();
    this.cartCount.subscribe(count => console.log(count));
  }


  logout() {
    this._authService.logout();
    this._toastrService.success('Logout Successfully!');
  }

}
