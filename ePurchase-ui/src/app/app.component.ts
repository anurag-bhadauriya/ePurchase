import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from './shared/path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Purchase';
  isLoggedIn: boolean = false;
  applicationPaths: any;
  menuItems: any[]=[];

  constructor(private router: Router){
    this.applicationPaths = paths;
    this.generateMenuItems();
  }
  
  ngOnInit(){
    // console.log(this.router);
  }

  ngAfterViewInit(){
  }

  generateMenuItems(){
    this.menuItems = [
      { 
        lable: 'Electronics',
        icon: 'fa fa-mobile',
        categoryItems: [
          { lable: 'Apple', value: 'iphone'},
          { lable: 'Asus', value: 'asus'},
          { lable: 'Xiaomi', value: 'redmi'},
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

}
