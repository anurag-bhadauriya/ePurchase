import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private productService: ProductService) {
  }
  
  ngOnInit(): void {
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

}
