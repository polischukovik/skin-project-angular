import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Product } from './entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];

  jsonURL = '../assets/products.json';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Product[]> {
    return this.http.get(this.jsonURL)
      .pipe(
        map((response: Product[]) => {
          return response;
        })
      );
  }

  find(id: string): Observable<Product> {
    return this.findAll()
      .pipe(
        map(products => products.find(product => product.id === id))
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError('A data error occurred');
  }
}
