import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  jsonURL = '../../assets/products.json';
  private products;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.products = data;
     });
  }

  ngOnInit() {
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }

}
