import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CartItem} from "../models/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string = 'http://localhost:8080/api/cart';

  addToCartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient) {
  }

  addProductToCart(userName: string, productId: number): Observable<string> {
    const url = `${this.baseUrl}/add_to_cart/${userName}/${productId}`;
    return this._http.post(url, null, {responseType: 'text'});
  }

  getCartCount(username: string | null): Observable<number> {
    return this._http.get<number>(`${this.baseUrl}/cart_count/${username}`);
  }

  getCartItems(username: string | null) {
    return this._http.get<CartItem[]>(`${this.baseUrl}/get_cart_items/${username}`);
  }

  getAddToCartCount(): Observable<number> {
    return this.addToCartCount.asObservable();
  }

  setAddToCartCount(cartValue: number) {
    this.addToCartCount.next(cartValue);
  }

  removeCartItem(cartId: number, username: string | null) {
    return this._http.delete(`${this.baseUrl}/remove_cart_item/${cartId}/${username}`, {responseType: 'text'});
  }
}
