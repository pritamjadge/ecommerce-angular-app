import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// product component
export class ProductListComponent implements OnInit {

  products!: Product[];
  isLoading!: boolean;

  constructor(private authenticationService: AuthenticationService, private _productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this._productService.getAllProducts().subscribe({
      next: (productData) => {
        if (productData !== null) {
          this.isLoading = false;
          this.products = productData;
        }

      }
    })
  }

  viewProductDetails(productId: number): void {
    console.log("viewProductDetails");
    //debugger;
    this._productService.viewProductDetails(productId).subscribe({
      next: (productDetails) => {
        console.log(productDetails);
        if (productDetails !== null) {
          this.router.navigate(['./view-product-details'], {
            queryParams: {product: JSON.stringify(productDetails)}
          }).then();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart() {
    debugger;
    this._productService.setAddCartCount(1);
  }


  // callApi() {
  //   this.authenticationService.callApi().subscribe(val => {
  //       console.log(JSON.stringify(val));
  //     },
  //     err => {
  //
  //     })
  // }
}
