import { Injectable } from '@angular/core';
import { Product } from '../products/entity/product';
import { Item } from '../products/entity/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  addToCart(product: Product) {
    const item: Item = { product, quantity: 1 };

    let items: Item[] = JSON.parse(localStorage.getItem('cart'));
    // if cart is empty
    if (items == null) {
      items = [];
      items.push(item);
    } else {
      // update quantity if item exists or add new
      const index = items.findIndex(e => e.product.id === product.id);
      // add item
      if (index === -1) {
        items.push(item);
      } else {
        // update
        const existingItem: Item = items[index];
        existingItem.quantity += 1;
        items[index] = existingItem;
      }
    }

    localStorage.setItem('cart', JSON.stringify(items));
  }

  remove(product: Product): void {
    const items: Item[] = JSON.parse(localStorage.getItem('cart'));
    const index = items.findIndex(e => e.product.id === product.id);

    if ( items[index].quantity > 1) {
      items[index].quantity = items[index].quantity - 1;
    } else {
      items.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(items));
  }

  getTotal(): number {
    let total = 0;
    for (const item of JSON.parse(localStorage.getItem('cart'))) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  getAllCartItems() {
    const items = [];
    for (const item of JSON.parse(localStorage.getItem('cart'))) {
      items.push({
        product: item.product,
        quantity: item.quantity
      });
    }

    return items;
  }

}
