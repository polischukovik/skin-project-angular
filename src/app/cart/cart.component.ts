import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Item } from '../products/entity/item';
import { ProductService } from '../products/product.service';
import { Product } from '../products/entity/product';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  private items: Item[] = [];
  private total = 0;
  private instance = this;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let self = this;
      const id = params['id'];
      if (id) {
        this.productService.find(id).subscribe(product => this.addToCart(product, this));
      } else {
        this.loadCart();
      }
    });
  }

  addToCart(product: Product, that) {
    const item: Item = {
      product,
      quantity: 1
    };
    let cart: Item[] = JSON.parse(localStorage.getItem('cart')) as Item[];

    // if cart is empty
    if (cart == null) {
      cart = [];
      cart.push(item);
    } else {
    // update quantity if item exists or add new

      const index = that.arrayIndex(product, cart);
      // add item
      if (index === -1) {
        cart.push(item);
      } else {
      // update
        const existingItem: Item = cart[index];
        existingItem.quantity += 1;
        cart[index] = existingItem;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    that.loadCart();
  }

  remove(product: Product): void {
    const cart: Item[] = JSON.parse(localStorage.getItem('cart'));
    const index = this.arrayIndex(product, cart);

    if ( cart[index].quantity > 1) {
      cart[index].quantity = cart[index].quantity - 1;
    } else {
      cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    for (const item of JSON.parse(localStorage.getItem('cart'))) {
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  arrayIndex(product: Product, array: Item[]): number {
    for (let i = 0; i < array.length; i++) {
      if ( array[i].product.id === product.id ) {
        return i;
      }
    }
    return -1;
  }

}
