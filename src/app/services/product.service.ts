import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product";

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
}
