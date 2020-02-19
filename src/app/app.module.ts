import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SelectComponent } from './components/select/select.component';
import { AdminModule } from './admin/admin.module';

const firbaseConfig = {
  apiKey: 'AIzaSyDiFG-hQ8TecPQ_7r-u-Pfw1iwM1b-Nl7k',
  authDomain: 'softy-skin.firebaseapp.com',
  databaseURL: 'https://softy-skin.firebaseio.com',
  projectId: 'softy-skin',
  storageBucket: 'softy-skin.appspot.com',
  messagingSenderId: '975343296839',
  appId: '1:975343296839:web:99cd92b2cf3433a19cac62',
  measurementId: 'G-SFPVLQ9707'
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    CartComponent,
    OrderComponent,
    ClickOutsideDirective,
    DropdownComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    AngularFireModule.initializeApp(firbaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
