import { Component, OnInit, Inject } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  constructor(private npService: NovaPoshtaService, private http: HttpClient) { }

  form: FormGroup;

  private orderResult = { ready: false, message: '' };
  formHasErrors = false;

  private selectedCityRef: string;
  private getCities = (param) => this.npService.getCities(param);
  private getOutlets = (param) => this.npService.getOutlets(param);
  private getId = (item: NpItem) => item.Ref;
  private getValue = (item: NpItem) => item.Description;

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      city: new FormControl(''),
      outlet: new FormControl('')
    });
    console.log(this.form);
  }

  onSubmit(form) {
    console.log(form);
    if (!form.hasError) {
      this.confirm();
    } else {
      this.formHasErrors = true;
    }
  }

  confirm() {
    const products = this.allStorage();
    console.log(products);
    const message: Message = {
      form: this.form.value,
      products
    };

    console.log(message);

    const backendResponse = { code: 'OK', message: 'Заявка на Ваше замовлення № 34425' };
    this.orderResult.message = backendResponse.message;
    this.orderResult.ready = true;
    localStorage.clear();
    this.form.reset();
  }

  onCitySelected(cityRef: string) {
    this.selectedCityRef = cityRef;
  }

  allStorage() {

    const values = [];
    const  keys = Object.keys(localStorage);
    let i = localStorage.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }

}

interface NpItem {
  Ref: string;
  Description: string;
}

interface Message {
  products: any;
  form: FormGroup;
}
