import { Component, OnInit } from '@angular/core';
import { Item } from '../products/entity/item';
import { ProductService } from '../products/product.service';
import { Product } from '../products/entity/product';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  private items: Item[] = [];
  private total = 0;
  private instance = this;

  constructor(
    private productService: ProductService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  remove(product: Product) {
    this.cartService.remove(product);
    this.loadCart();
  }

  loadCart(): void {
    this.items = this.cartService.getAllCartItems();
    this.total = this.cartService.getTotal();
  }

}
