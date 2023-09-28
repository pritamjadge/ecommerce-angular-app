import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

//  private productsBaseUrl: string = 'https://fakestoreapi.com';
  private productsBaseUrl: string = "http://localhost:8080/api/product"

  constructor(private _http: HttpClient) {
  }

  /*
    getAllProducts() {
      return this._http.get<Product[]>(`${this.productsBaseUrl}/find_products`);
    }*/

  getAllProducts(page: number, size: number): any {
    return this._http.get<any>(`${this.productsBaseUrl}/find_products?page=${page}&size=${size}`);
  }

  findByProductsName(productName: any, pageIndex: number, pageSize: number) {
    const encodedProductName = encodeURIComponent(productName);
    return this._http.get<any>(`${this.productsBaseUrl}/find_products_by_name?productName=${encodedProductName}&page=${pageIndex}&size=${pageSize}`);
  }

  viewProductDetails(productId: number) {
    console.log("viewProductDetails in service");
    return this._http.get<any>(`${this.productsBaseUrl}/product_details/${productId}`);
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
