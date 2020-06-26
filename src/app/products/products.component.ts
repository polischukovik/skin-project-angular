import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './entity/product';
import { CartService } from '../cart/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.findAll().subscribe( data => this.products = data);
  }

  toCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
