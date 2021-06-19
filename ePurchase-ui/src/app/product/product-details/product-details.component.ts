import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number =0;
  productData: any;
  isValidProductId: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, private location: Location,
    private sharedDataService: SharedDataService, private spinnerService: NgxSpinnerService) {
  }
  
  ngOnInit(): void {
    this.showSpinner();
    this.route.params.subscribe(param=> this.productId = param['productId']);
    this.getProductDetailById();
  }

  getProductDetailById(){
    this.productService.getProductById(this.productId).subscribe(
      response => {
        if(response.length !==0) { this.productData = response[0]; this.isValidProductId= true; }
        else { this.isValidProductId = false; }
      },
      err =>{ console.log(err); }
    );
  }

  goBack(){
    this.location.back();
  }

  addProductToCart(){
    this.showSpinner();
    if(this.sharedDataService.isUserLoggedIn){
      let itemPresentInCart: boolean = false;
      let cartItems = this.sharedDataService.loggedInUserData?.user_cart;
      // Increase quantity of item if it is already present in cart
      for( let cartItem of cartItems){
        if(cartItem.prodId === this.productData.product_id){
          itemPresentInCart = true;
          cartItem.prodQty += 1;
          break;
        }
      }
      // Add item to cart if it is not already present
      if(!itemPresentInCart){
        cartItems.push({
          prodId: this.productData.product_id , prodQty: 1
        });
      }
      let userId = this.sharedDataService.loggedInUserData?.user_id;
      this.productService.addToCart(userId, cartItems).subscribe(
        cartData => {
          this.sharedDataService.loggedInUserData.user_cart = cartData[0].user_cart;
          this.showSnackBar();
        },
        err => console.log(err)
      );
    }
    else{
      this.router.navigate(['/auth/login']);
    }
  }

  showSnackBar(){
    let x = document.getElementById("snackbar");
    if(x){
      x.className = "show";
      setTimeout(function () { if(x){ x.className = x.className.replace("show", "");} }, 2000);
    }
  }

  showSpinner(){
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 700);
  }

}
