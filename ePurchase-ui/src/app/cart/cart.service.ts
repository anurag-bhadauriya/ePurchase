import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string;
  cartData: any[] =[];
  
  constructor(private http: HttpClient) {
    this.baseUrl = environment.serviceUrl;
  }

  getProductById(productId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}product/${productId}`);
  }

  addToCart(userId: number, cartItems: any[] ): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}users/${userId}/addtocart`, cartItems);
  }
  
}
