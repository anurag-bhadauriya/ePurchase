import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  availableProducts:any;
  productsList: any[] =[];

  constructor(private productService: ProductService, private router: Router) {
    this.getAllProducts();
  }

  ngOnInit(): void {
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

}
