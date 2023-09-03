import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsBaseUrl: string = 'https://fakestoreapi.com';

  constructor(private _http: HttpClient) {
  }

  getAllProducts() {
    return this._http.get<Product[]>(`${this.productsBaseUrl}/products`);
  }

  viewProductDetails(productId: number) {
    console.log("viewProductDetails in service");
    return this._http.get<Product>(`${this.productsBaseUrl}/products/${productId}`);
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
