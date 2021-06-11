import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductRoutingModule } from './product-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductMgmtComponent } from './product-mgmt/product-mgmt.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    ProductMgmtComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxSpinnerModule
  ]
})
export class ProductModule { }
