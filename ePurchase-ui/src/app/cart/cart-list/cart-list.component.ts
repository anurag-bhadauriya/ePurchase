import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  loggedInUserDataSubscription: any;
  cartData: any[] =[];
  productsData: any[] =[];
  cartTotal: number = 0;
  totalTax: number = 0;
  totalPayable: number = 0;

  constructor(private sharedDataService: SharedDataService, 
    private cartService: CartService) {
      this.cartService.cartData = this.sharedDataService.loggedInUserData?.user_cart;
      this.cartData = this.cartService.cartData;
      this.getProductsData();
  }

  ngOnInit(): void {}

  getProductsData(){
    if(this.cartData.length !==0){
      this.cartData.forEach( elem =>{
        this.cartService.getProductById(elem.prodId).subscribe(
          productItem => {
            let prodData = productItem[0];
            prodData.quantity = elem.prodQty;
            this.productsData.push(prodData);
            this.calculateBill();
          },
          err => console.log(err)
        );
      });
    }
  }

  calculateBill(){
    this.cartTotal =0;
    for(let i=0; i<this.productsData.length; i++){
      this.cartTotal += this.productsData[i].quantity * (1 - this.productsData[i]?.seller_details[0]?.discount) * this.productsData[i]?.product_details.price;
    }
    this.totalTax = (17 / 100) * this.cartTotal;
    this.totalPayable = this.totalTax + this.cartTotal;
  }

  updateCart(item: any, qty: number){
    let userId = this.sharedDataService.loggedInUserData.user_id;
    let cartData = this.cartData;
    let productsData = this.productsData;
    for(let i=0; i<cartData.length; i++){
      if(cartData[i].prodId == item.product_id)
        cartData[i].prodQty += qty;
      if(productsData[i].product_id == item.product_id)
        productsData[i].quantity += qty;
    }
    this.cartService.addToCart(userId, cartData).subscribe(
      data => {
        this.showSnackBar()
        this.cartData = cartData;
        this.productsData = productsData;
        this.sharedDataService.loggedInUserData.user_cart = cartData;
        this.calculateBill();
      },
      err => console.log(err)
    );
  }

  removeItemFromCart(item: any){
    let userId = this.sharedDataService.loggedInUserData.user_id;
    let cartData: any[] =[];
    let productsData: any[] =[];
    for(let i=0; i<this.cartData.length; i++){
      if(this.cartData[i].prodId !== item.product_id)
        cartData.push(this.cartData[i]);
      if(this.productsData[i].product_id !== item.product_id)
        productsData.push(this.productsData[i]);
    }
    this.cartService.addToCart(userId, cartData).subscribe(
      data => {
        this.showSnackBar();
        this.productsData = productsData;
        this.cartData = cartData;
        this.sharedDataService.loggedInUserData.user_cart = cartData;
        this.calculateBill();
      },
      err => console.log(err)
    );
  }

  showSnackBar(){
    let x = document.getElementById("snackbar");
    if(x){
      x.className = "show";
      setTimeout(function () { if(x){ x.className = x.className.replace("show", "");} }, 2000);
    }
  }

}
