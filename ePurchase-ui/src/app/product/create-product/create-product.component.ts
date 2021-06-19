import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  newProductForm: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService,
    private spinnerService: NgxSpinnerService) {
    this.createNewProductForm();
  }

  ngOnInit(): void {}

  createNewProductForm(){
    this.newProductForm = this.fb.group({
      productName: ['Clark Kent Glasses', Validators.required],
      category: ['Accessories', Validators.required],
      price: [ 12000 , Validators.required],
      color: ['Black', Validators.required],
      specification: ['Quality material with customized power', Validators.required],
      rating: [ 4.1 , Validators.required],
      description: ['Clark kent glasses will make you look like Superman.', Validators.required],
      image: [''],
      sellerId: ['glasses@seller', Validators.required],
      discount: [ 0.3 , Validators.required],
      availableQuantity: [ 22, Validators.required],
      shippingCharge: [ 60, Validators.required],
    });
  }

  createNewProduct(){
    this.showSpinner();
    let formData = this.newProductForm.value;
    let productObj = {
      productDetails: {
        name: formData.productName,
        description: formData.description,
        rating: formData.rating,
        color: formData.color,
        category: formData.category,
        price: formData.price,
        image: formData.image,
        specification: formData.specification
      },
      sellerDetails: [
        {
          sellerId: formData.sellerId,
          discount: formData.discount,
          quantity: formData.availableQuantity,
          shippingCharge: formData.shippingCharge
        }
      ]
    };
    this.productService.addProduct(productObj).subscribe(
      data =>{
        this.showSnackBar('Product Successfully Added in Inventory !', 'alert-success');
        this.newProductForm.reset();
      },
      err => {
        this.showSnackBar(`Some Error Occured ! Please try again later !`, `alert-danger`);
        console.log(err);
      }
    );
  }

  showSnackBar(msg: string, msgType: string){
    let x = document.getElementById("snackbar");
    if(x){
      x.innerHTML = msg;
      x.classList.add(msgType);
      x.classList.add('show');
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
