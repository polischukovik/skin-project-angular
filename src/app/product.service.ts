import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    jsonURL = '../../assets/products.json';

    constructor(private http: HttpClient){}

    get() {
        return this.http.get<ProductResponse>(this.jsonURL)
            .pipe(map(response => { return response.products; }));
    }
}

interface Product {
    id: number;
    name: string;
    description: string;
    size: string;
    price: number;
    position: number;
    image: string;
  }
  
  interface ProductResponse {
    products: Product[];
  }