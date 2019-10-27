import { Component, OnInit } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';
import { City } from '../products/entity/city';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  private orderCity = '';
  private selectedCityRef: string;
  private getCities = (param) => this.npService.getCities(param);
  private getOutlets = (param) => this.npService.getOutlets(param);
  private getId = (item: NpItem) => item.Ref;
  private getValue = (item: NpItem) => item.Description;

  constructor(private npService: NovaPoshtaService) {}

  ngOnInit() { }

  onCitySelected(cityRef: string) {
    this.selectedCityRef = cityRef;
  }

}

interface NpItem {
  Ref: string;
  Description: string;
}
