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

  constructor(private npService: NovaPoshtaService, private http: HttpClient) {}

  form: FormGroup;

  private orderResult = { ready: false, message: ''};
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
    const backendResponse = { code: 'OK', message: 'Заявка на Ваше замовлення № 34425'};
    this.orderResult.message = backendResponse.message;
    this.orderResult.ready = true;
    localStorage.clear();
  }

  onCitySelected(cityRef: string) {
    this.selectedCityRef = cityRef;
  }

}

interface NpItem {
  Ref: string;
  Description: string;
}
