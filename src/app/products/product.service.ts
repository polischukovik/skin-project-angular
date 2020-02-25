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
    return this.http.get( '/api/v1/products' )
      .pipe(
        map((response: any) => {
          return response._embedded.products;
        })
      );
  }

  findOne(uuid: string): Observable<Product> {
    return this.http.get<Product>( `/api/v1/products/search/findByUuid?uuid=${uuid}` );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError('A data error occurred');
  }
}
