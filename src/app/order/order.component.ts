import { Component, OnInit } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  private cities = [];
  private outlets = [];
  private orderCity = '';

  constructor(private npService: NovaPoshtaService) {}

  ngOnInit() { }

  getCities(input: string) {
    if (input.length > 0) {
      this.npService.getCities(input).subscribe( (data) => {
        this.cities = data;
      });
    }
  }

  getOutlets(cityRef: string) {
    this.npService.getOutlets(cityRef).subscribe( (data) => {
      this.outlets = data;
    }
  }

}
