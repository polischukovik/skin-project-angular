import { Component, OnInit, Inject } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';
import { HttpClient } from '@angular/common/http';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  constructor(private npService: NovaPoshtaService, private http: HttpClient) {}

  private orderCity = '';
  private orderResult = { valid: false, message: ''};
  private phoneValid = true;

  private selectedCityRef: string;
  private getCities = (param) => this.npService.getCities(param);
  private getOutlets = (param) => this.npService.getOutlets(param);
  private getId = (item: NpItem) => item.Ref;
  private getValue = (item: NpItem) => item.Description;

  ngOnInit() { }

  onSubmit(form) {
    console.log(form);
  }

  confirm() {
    const backendResponse = { code: 'OK', message: 'Заявка на Ваше замовлення № 34425'};
    this.orderResult.message = backendResponse.message;
    this.orderResult.valid = true;
    localStorage.clear();
  }

  onCitySelected(cityRef: string) {
    this.selectedCityRef = cityRef;
  }

  hasError(event) {
    console.log(event);
    this.phoneValid = event;
  }

  telInputObject(obj) {
    this.telInputObject = obj;
    console.log(obj);
  }

  getNumber(obj) {
    console.log(obj);
  }
}

interface NpItem {
  Ref: string;
  Description: string;
}
