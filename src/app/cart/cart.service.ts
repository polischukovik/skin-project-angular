import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../products/entity/product';
import { Item } from '../products/entity/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  cartChanged = new EventEmitter();

  addToCart(product: Product) {
    const item: Item = { product, quantity: 1 };

    let items: Item[] = JSON.parse(localStorage.getItem('cart'));
    // if cart is empty
    if (items == null) {
      items = [];
      items.push(item);
    } else {
      // update quantity if item exists or add new
      const index = items.findIndex(e => e.product.uuid === product.uuid);
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
    this.cartChanged.emit();
  }

  remove(product: Product): void {
    const items: Item[] = JSON.parse(localStorage.getItem('cart'));
    const index = items.findIndex(e => e.product.uuid === product.uuid);

    if ( items[index].quantity > 1) {
      items[index].quantity = items[index].quantity - 1;
    } else {
      items.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(items));
    this.cartChanged.emit();
  }

  getTotal(): number {
    let total = 0;
    const storageItems = JSON.parse(localStorage.getItem('cart'));
    if (!this.isIterable(storageItems)) { return 0; }
    for (const item of storageItems) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  getCount(): number {
    let result = 0;

    const items = this.getAllCartItems();
    if (!this.isIterable(items)) { return result; }
    for (const item of items) {
      result += item.quantity;
    }
    return result;
  }

  getAllCartItems(): any[] {
    const items = [];
    const storageItems = JSON.parse(localStorage.getItem('cart'));
    if (!this.isIterable(storageItems)) { return []; }
    for (const item of storageItems) {
      items.push({
        product: item.product,
        quantity: item.quantity
      });
    }

    return items;
  }

  getProducts(): Product[] {
    const products: Product[] = [];
    this.getAllCartItems().forEach(element => {
      for (let i = 0; i < element.quantity; i++) {
        products.push(element.product);
      }
    });
    return products;
  }

  get empty() {
    const storageItems = JSON.parse(localStorage.getItem('cart'));
    if (!this.isIterable(storageItems)) { return true; }
    return storageItems.length === 0;
  }

  private isIterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
  }

}
