import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  availableProducts:any;
  productsList: any[] =[];
  cartItems:any[] =[];
  queryParams: any;

  constructor(private productService: ProductService, private router: Router,
    private sharedDataService: SharedDataService, private route: ActivatedRoute) {
    this.getAllProducts();
    this.cartItems = sharedDataService.loggedInUserData?.user_cart;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( param =>{ 
      this.queryParams = param;
      this.getProductsByCategory(this.queryParams);
    });
  }

  navigateToProductDetailsPage(productId: number){
    this.router.navigate(['/product/detail', productId]);
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data =>{
      this.productsList =data;
      this.availableProducts = data.length;
    })
  }

  getProductsByCategory(queryParams: any){
    if(Object.keys(queryParams).length !==0 ){
      this.productService.getProductByCategory(queryParams).subscribe(
        data => {
          this.productsList = data;
          this.availableProducts = data.length;
        },
        err => console.log(err)
      );
    } else{ this.getAllProducts(); }
  }

  addProductToCart(item: any){
    if(this.sharedDataService.isUserLoggedIn){
      let itemPresentInCart: boolean = false;
      // Increase quantity of item if it is already present in cart
      for( let cartItem of this.cartItems){
        if(cartItem.prodId === item.product_id){
          itemPresentInCart = true;
          cartItem.prodQty += 1;
          break;
        }
      }
      // Add item to cart if it is not already present
      if(!itemPresentInCart){
        this.cartItems.push({
          prodId: item.product_id , prodQty: 1
        });
      }
      let userId = this.sharedDataService.loggedInUserData?.user_id;
      this.productService.addToCart(userId, this.cartItems).subscribe(
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

}
