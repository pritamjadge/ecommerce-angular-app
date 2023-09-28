import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MatLegacyPaginator} from "@angular/material/legacy-paginator";

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 12;
  products: Product[] = [];
  isLoading: boolean = false;

  foods: any [] = [
    {value: 'pizza-1', viewValue: 'Mobile'},
    {value: 'tacos-2', viewValue: 'Cloths'},
  ];

  totalPages: number | undefined;
  productName: string | undefined;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts(this.pageIndex, this.pageSize);
  }

  getAllProductsPagination(pageIndex: number, pageSize: number) {
    if (!this.productName) {
      this.getAllProducts(pageIndex, pageSize);
    } else {
      this.fetchProducts(this.productName, pageIndex, pageSize);
    }
  }

  findByProductsName(event: any, matPaginator: MatLegacyPaginator) {
    const pageIndex = matPaginator.pageIndex;
    const pageSize = matPaginator.pageSize;
    this.productName = event.target.value;
    this.fetchProducts(this.productName ?? '', pageIndex, pageSize);
  }

  fetchProducts(productName: string, pageIndex: number, pageSize: number) {
    this._productService.findByProductsName(productName, pageIndex, pageSize).subscribe({
      next: (productData: any) => {
        if (productData !== null || productData.content != '[]' || productData.content != null) {
          this.isLoading = false;
          this.totalPages = productData.totalPages;
          this.products = productData.content;
          console.log(this.products);
        } else {
          console.log("No Product Has been Found...!!")
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        this.isLoading = false;
      }
    })
  }

  getAllProducts(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this._productService.getAllProducts(pageIndex, pageSize).subscribe({
      next: (productData: any) => {
        if (productData !== null) {
          this.isLoading = false;
          this.totalPages = productData.totalPages;
          this.products = productData.content;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        this.isLoading = false;
      }
    });
  }


  sort(criteria: string): void {
    switch (criteria) {
      case 'name':
        this.products.sort((a, b) => this.compareStrings(a.productName, b.productName));
        break;
      case 'priceLowToHigh':
        this.products.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case 'priceHighToLow':
        this.products.sort((a, b) => b.productPrice - a.productPrice);
        break;
      default:
        break;
    }
  }

  private compareStrings(a: string, b: string): number {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    return nameA.localeCompare(nameB);
  }

  sanitizeImageUrl(imageUrl: string): any {
    let image = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    // console.log(image);
    return image;
  }


  // viewProductDetails(productId: number): void {
  //   this._productService.viewProductDetails(productId).subscribe({
  //     next: (productDetails) => {
  //       console.log(productDetails);
  //       if (productDetails !== null) {
  //         this.router.navigate(['./view-product-details'], {
  //           queryParams: {product: JSON.stringify(productDetails)}
  //         }).then();
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  addToCart() {
    debugger;
    this._productService.setAddCartCount(1);
  }
}
