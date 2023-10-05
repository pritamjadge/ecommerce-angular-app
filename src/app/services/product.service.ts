import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product";
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


//  private productsBaseUrl: string = 'https://fakestoreapi.com';
  private productsBaseUrl: string = "http://localhost:8080/api/product";

  private categoryBaseUrl: string = "http://localhost:8080/api/category";

  constructor(private _http: HttpClient) {
  }


  getAllProducts(page: number, size: number): any {
    return this._http.get<any>(`${this.productsBaseUrl}/find_products?page=${page}&size=${size}`);
  }

  findByProductsByNameAndCategory(productName: string, categoryId: any, pageIndex: number, pageSize: number) {
    console.log("productName {} :"+productName);
    console.log("categoryId {} :"+categoryId);
    const encodedProductName = encodeURIComponent(productName);
    return this._http.get<any>(`${this.productsBaseUrl}/find_products_by_name?productName=${encodedProductName}&categoryId=${categoryId}&page=${pageIndex}&size=${pageSize}`);

  }

  viewProductDetails(productId: number) {
    console.log("viewProductDetails in service");
    return this._http.get<Product>(`${this.productsBaseUrl}/product_details/${productId}`);
  }

  getAllCategories() {
    return this._http.get<Category[]>(`${this.categoryBaseUrl}/get_categories`);
  }

  addToCartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getAddToCartCount(): Observable<number> {
    return this.addToCartCount.asObservable();
  }

  setAddCartCount(cartValue: number) {
    console.log(cartValue + this.addToCartCount.value);
    this.addToCartCount.next(this.addToCartCount.value + cartValue);
  }
}
