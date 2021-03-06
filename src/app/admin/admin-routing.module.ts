import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CropperComponent } from './cropper/cropper.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'products/new',
        component: ProductCreateComponent
      },
      {
        path: 'products/edit/:uuid',
        component: ProductUpdateComponent
      },
      {
        path: 'orders',
        component: OrderListComponent
      },
      {
        path: 'update',
        component: ProductUpdateComponent
      },
      {
        path: 'cropper',
        component: CropperComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
