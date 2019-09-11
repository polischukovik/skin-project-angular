import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  private products;

  constructor(private productService: ProductService) {
    this.get()
  }

  ngOnInit() {
    this.productService.get()
      .subscribe(products => {
        this.products = products;
     });
  }

  public get() {
    return this.products;
  }

}