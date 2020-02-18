import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http: HttpClient ) { }

  createOrder(order: Order): Observable<any> {
    return this.http.post('/api/v1/orders', order);
  }
}
