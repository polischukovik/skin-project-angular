import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './entity/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];

  constructor(private productService: ProductService) {
    this.get();
  }

  ngOnInit() {
    this.productService.findAll().subscribe((data) => this.products = data);
  }

  public get() {
    return this.products;
  }

}
