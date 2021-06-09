import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl:string;
  
  constructor(private http: HttpClient) {
    this.baseUrl = environment.serviceUrl;
  }

  getAllProducts(){
    return this.http.get<any>(`${this.baseUrl}product`);
  }

  getProductById(productId: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}product/${productId}`);
  }

}
