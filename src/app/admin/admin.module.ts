import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { LyTheme2, StyleRenderer, LY_THEME, LY_THEME_NAME } from '@alyle/ui';

import { ProductListComponent } from './product-list/product-list.component';
import { AdminComponent } from './admin/admin.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CropperComponent } from './cropper/cropper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    AdminComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    LoginComponent,
    OrderListComponent,
    CropperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    LyImageCropperModule,
    LyButtonModule,
    LyIconModule
  ],
  exports: [CropperComponent, ProductUpdateComponent],
  providers: [
    [ LyTheme2 ],
    [ StyleRenderer ],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true } // name: `minima-dark`
  ]
})
export class AdminModule {}
