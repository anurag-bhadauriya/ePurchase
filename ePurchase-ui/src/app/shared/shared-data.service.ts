import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

    baseUrl: string =''; 
    isUserLoggedIn: boolean = false;
    loggedInUserData: any;

    isUserLoggedInBs$ = new BehaviorSubject(false);
    loggedInUserDataBs$ = new BehaviorSubject(undefined);

    constructor(private http: HttpClient) {
      this.baseUrl = environment.serviceUrl;
    }

    getUserDetailsForSession(userId: any): Observable<any>{
      return this.http.get<any>(`${this.baseUrl}users/${userId}`);
    }

    updateisUserLoggedIn(value: boolean){
      this.isUserLoggedIn = value;
      this.isUserLoggedInBs$.next(value);
    }

    updateUserLoggedInData(userData: any){
      this.loggedInUserData = userData;
      this.loggedInUserDataBs$.next(userData);
    }

}
