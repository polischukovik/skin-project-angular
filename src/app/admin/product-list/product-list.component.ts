import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { Product } from 'src/app/products/entity/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  public selected: Product;
  @Output() refreshed: EventEmitter<Product[]> = new EventEmitter();
  constructor( public productService: ProductService ) { }

  ngOnInit() {

  }

  refresh() {
    this.productService.findAll().subscribe(
      products =>  {
        this.products = products;
        this.refreshed.emit(products);
      }
    );
  }

}
