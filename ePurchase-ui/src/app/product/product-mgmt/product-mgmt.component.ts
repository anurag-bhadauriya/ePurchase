import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-mgmt',
  templateUrl: './product-mgmt.component.html',
  styleUrls: ['./product-mgmt.component.css']
})
export class ProductMgmtComponent implements OnInit {

  availableProducts:any;
  productsList: any[] =[];
  tableContent: any ={ header: '', data: ''};
  activeModalId: number;

  constructor(private productService: ProductService,
    private spinnerService: NgxSpinnerService) {
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.showSpinner();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data =>{
      this.productsList =data;
      this.availableProducts = data.length;
      this.createTableIterable();
    });
  }

  createTableIterable(){
    this.tableContent.header =[
      'Product Id', 'Category', 'Name', 'Color', 'Price','Rating', 'Actions'];
    this.tableContent.data =[];
    for(let i =0; i< this.productsList.length; i++){
      let prodObj = {
        productId: this.productsList[i].product_id,
        category: this.productsList[i].product_details.category,
        name: this.productsList[i].product_details.name,
        color: this.productsList[i].product_details.color,
        rating: this.productsList[i].product_details.rating,
        price: this.productsList[i].product_details.price
      };
      this.tableContent.data.push(prodObj);
    }
  }

  deleteProduct(){
    this.productService.deleteProduct(this.activeModalId).subscribe(
      data =>{
        this.getAllProducts();
        this.showSnackBar();
      },
      err => console.log(err)
    )
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
