import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.serviceUrl;
  }

  login(userCreds: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}auth/login`, userCreds);
  }

}
