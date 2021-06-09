import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m=> m.AuthModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m=> m.ProductModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m=> m.OrderModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m=> m.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
