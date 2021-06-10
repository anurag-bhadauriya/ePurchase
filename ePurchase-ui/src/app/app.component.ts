import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { paths } from './shared/path';
import { SessionStorageService } from './shared/session-storage.service';
import { SharedDataService } from './shared/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'E-Purchase';
  applicationPaths: any;
  menuItems: any[]=[];
  isUserLoggedIn: boolean = false;
  loggedInUserData: any;
  isUserLoggedInSubscription: any;
  userLoggedInDataSubscription: any;

  constructor(private router: Router, public sharedDataService: SharedDataService,
    private sessionStorageService: SessionStorageService){
    this.applicationPaths = paths;
    this.checkLoginSession();
    this.generateMenuItems();
  }
  
  ngOnInit(){
    this.isUserLoggedInSubscription = this.sharedDataService.isUserLoggedInBs$.subscribe( val =>{
      this.isUserLoggedIn = val;
    });
    this.userLoggedInDataSubscription = this.sharedDataService.loggedInUserDataBs$.subscribe( val =>{
      this.loggedInUserData = val;
    });
  }

  ngAfterViewInit(){}

  checkLoginSession(){
    let sessionToken = this.sessionStorageService.getToken();
    let sessionUserKey = this.sessionStorageService.getUserKey();
    if(sessionToken && sessionUserKey){
      this.getUserData(sessionUserKey);
    }
  }

  getUserData(userId: any){
    this.sharedDataService.getUserDetailsForSession(userId).subscribe(
      data =>{
        if(data.length == 1 ){
          this.updateSharedData(data[0], true);
        }
      },
      err => console.log(err)
    )
  }

  logout(){
    this.sessionStorageService.signOut();
    this.updateSharedData( undefined, false);
  }

  updateSharedData(loggedInUserData: any, isUserLoggedIn: boolean){
    this.sharedDataService.updateisUserLoggedIn(isUserLoggedIn);
    this.sharedDataService.updateUserLoggedInData(loggedInUserData);
  }

  generateMenuItems(){
    this.menuItems = [
      {
        lable: 'Electronics',
        icon: 'fa fa-mobile',
        categoryItems: [
          { lable: 'Apple', value: 'apple' },
          { lable: 'Asus', value: 'asus'},
          { lable: 'Xiaomi', value: 'xiaomi'},
          { lable: 'Lenovo', value: 'lenovo'}
        ]
      },
      { 
        lable: 'Furniture',
        icon: 'fa fa-home',
        categoryItems:[
          { lable: 'Computer Table', value: 'computer table'},
          { lable: 'Study Table', value: 'study table'},
          { lable: 'Dressing Table', value: 'dressing table'},
          { lable: 'Dining Table', value: 'dining table'},
          { lable: 'Recliner Sofa', value: 'recliner sofa'},
        ] 
      },
      { 
        lable: 'Shoes',
        icon: 'fa fa-futbol-o',
        categoryItems: [
          { lable: 'For Him', value: 'running men'},
          { lable: 'For Her', value: 'running women'},
        ] 
      },
      { 
        lable: 'Clothing',
        icon: 'fa fa-child',
        categoryItems: [
          { lable: 'Traditional', value: 'traditional'},
          { lable: 'Western', value: 'western'},
        ] 
      }
    ];
  }

  loadCategorySpecificProducts(category: string, type: string){
    this.router.navigate(['/product'], { queryParams: { category: category, type: type}});
  }

  ngOnDestroy(){
    this.isUserLoggedInSubscription.unsubscribe();
    this.userLoggedInDataSubscription.unsubscribe();
  }

}
