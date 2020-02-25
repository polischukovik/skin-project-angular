import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { Product } from 'src/app/products/entity/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  public selected?: Product;
  @Output() refreshed: EventEmitter<Product[]> = new EventEmitter();
  constructor( public productService: ProductService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {

  }

  refresh() {
    this.productService.findAll().subscribe(
      products =>  {
        this.products = products;
        this.refreshed.emit(products);
      }
    );
  }

  edit(product: Product) {
    this.router.navigate(['./edit', product.uuid], { relativeTo: this.route });
  }

}
