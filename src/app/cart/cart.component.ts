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

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        //of(this.productService.find(id).subscribe(this.addToCart)).subscribe( whenDone => this.loadCart());
        this.productService.find(id).pipe(map(this.addToCart)).subscribe(() => this.loadCart());
      } else {
        this.loadCart();
      }
    });
  }

  addToCart(product: Product) {
    const item: Item = {
      product,
      quantity: 1
    };
    console.log(product);

    // if cart is empty
    if (localStorage.getItem('cart') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
    // update quantity if item exists or add new
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (let i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product.id === product.id) {
          index = i;
          break;
        }
      }
      // add item
      if (index === -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
      // update
        let item: Item = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (let i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id === id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

}
