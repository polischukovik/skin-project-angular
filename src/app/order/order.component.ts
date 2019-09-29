import { Component, OnInit } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  private orderCity = '';
  private getCities = (param) => this.npService.getCities(param);
  private getOutlets = (param) => this.npService.getOutlets(param);

  constructor(private npService: NovaPoshtaService) {}

  ngOnInit() { }

}
