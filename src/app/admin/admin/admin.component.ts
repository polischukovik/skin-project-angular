import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from 'src/app/products/entity/product';

@Component({
  selector: 'app-product',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private products: Product[] = [];

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onActivete(component) {
    if (component instanceof ProductListComponent) {
      if (this.products.length === 0) {

        console.log('refresh');
        component.refresh();
      } else {
        component.products = this.products;
      }
      component.refreshed.subscribe( products => this.products = products );
    }
  }

}
