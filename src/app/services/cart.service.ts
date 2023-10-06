import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: String = 'http://localhost:8080/api/cart';

  constructor(private _http: HttpClient) {
  }

  addProductToCart(userName: string, productId: number): Observable<string> {
    const url = `${this.baseUrl}/add_to_cart/${userName}/${productId}`;
    return this._http.post(url, null, {responseType: 'text'});
  }

  getCartCount(username: string | null): Observable<number> {
    return this._http.get<number>(`${this.baseUrl}/cart_count/${username}`);
  }

  addToCartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getAddToCartCount(): Observable<number> {
    return this.addToCartCount.asObservable();
  }

  setAddToCartCount(cartValue: number) {
    this.addToCartCount.next(cartValue);
  }

}
