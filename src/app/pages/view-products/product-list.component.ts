import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';
import {HttpErrorResponse} from '@angular/common/http';
import {MatLegacyPaginator} from '@angular/material/legacy-paginator';
import {Category} from '../../models/Category';
import {AuthenticationService} from "../../services/authentication.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Properties
  pageIndex = 0;
  pageSize = 12;
  products: Product[] = [];
  categories: Category[] = [];
  isLoading = false;
  totalPages: number | undefined;
  productName = '';
  categoryId: any = '';
  productNotFoundMessage: string = "";
  errorMessage: string = "";


  constructor(private productService: ProductService,
              private authService: AuthenticationService,
              private _router: Router,
              private cartService: CartService,
              private _toastr: ToastrService) {
  }

  ngOnInit(): void {
    // Initialize data on component load
    this.getAllProducts(this.pageIndex, this.pageSize);
    this.getAllCategories();
    this.setProductCartCount();
  }

  // Event Handlers

  // Handle category change event
  getCategoryProductsOnChange(event: any, matPaginator: MatLegacyPaginator) {
    const pageIndex = matPaginator.pageIndex;
    const pageSize = matPaginator.pageSize;
    const selectedValue = event.target.value;
    this.categoryId = selectedValue;
    this.getAllProductsPagination(pageIndex, pageSize);
  }

  // Handle product name input change event
  findByProductsName(event: any, matPaginator: MatLegacyPaginator) {
    const pageIndex = matPaginator.pageIndex;
    const pageSize = matPaginator.pageSize;
    this.productName = event.target.value;
    this.fetchProducts(this.productName, pageIndex, pageSize);
  }

  // Handle sorting
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

  // Methods

  // Fetch products based on name and category
  fetchProducts(productName: string, pageIndex: number, pageSize: number) {
    const categoryId = this.categoryId;
    this.productService.findByProductsByNameAndCategory(productName, categoryId, pageIndex, pageSize).subscribe({
      next: (productData: any) => {
        if(!productData)
          this.isLoading = false;
        else
          this.handleProductData(productData);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = "Something went wrong, Please try again later.";
      }
    });
  }

  // Handle product data from API response
  private handleProductData(productData: any): void {
    if (productData !== null) {
      this.totalPages = productData.totalPages;
      this.products = productData.content || [];

      if (this.products.length === 0) {
        this.productNotFoundMessage = "Product Not Found, try again later.";
        console.log('Product Not Found, try again later.');
      }
      this.isLoading = false;
    }
  }

  // Get all products with pagination
  getAllProductsPagination(pageIndex: number, pageSize: number) {
    if (this.productName === '' && this.categoryId === '') {
      this.getAllProducts(pageIndex, pageSize);
    } else {
      this.fetchProducts(this.productName, pageIndex, pageSize);
    }
  }

  // Get all product categories
  getAllCategories() {
    this.productService.getAllCategories().subscribe({
      next: (category: Category[]) => {
        this.categories = category;
      },
      error: (err: any) => {
        console.log(err.error);
        this.errorMessage = "Something went wrong, Please try again later.";
        this.isLoading = false;
      }
    });
  }

  // Get all products
  getAllProducts(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.productService.getAllProducts(pageIndex, pageSize).subscribe({
      next: (productData: any) => {
        this.handleProductData(productData);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Status:', err.status);
        if (err.status == 0) {
          this.errorMessage = "Something went wrong, Please try again later";
        }
      }
    });
  }

  // Utility method to compare strings for sorting
  private compareStrings(a: string, b: string): number {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    return nameA.localeCompare(nameB);
  }

  // Add product to cart (if needed)
  addToCart(productId: number) {
    if (!this.authService.isLoggedIn()) {
      Swal.fire({
        title: 'User Not Logged in.',
        text: 'Please Sign-In to add a product to the cart.',
        icon: 'info',
        allowOutsideClick: true,
      }).then();
      return false;
    } else {
      console.log("User Login");
      const username = this.authService.getUserName();
      this.cartService.addProductToCart(username ?? '', productId).subscribe({
        next: response => {
          console.log(response);
          if (response.includes('successfully')) {
            this.showSuccessMessage(response);
            this.setProductCartCount();

          } else
            this.showErrorMessage(response);
        },
        error: err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Product not added into cart',
          })
        }
      });
    }
    return true;
  }

  showSuccessMessage(message: string): void {
    this._toastr.success(message, '', {
      timeOut: 3500,
      positionClass: 'toast-top-center',
    });
  }

  private showErrorMessage(error: string) {
    Swal.fire({
      title: '',
      text: error,
      icon: 'warning',
      allowOutsideClick: true,
    }).then();
  }

  private setProductCartCount() {
    if (this.authService.isLoggedIn()) {
      this.cartService.getCartCount(this.authService.getUserName()).subscribe(count => {
        this.cartService.setAddToCartCount(count);
      });
    }
  }
}
