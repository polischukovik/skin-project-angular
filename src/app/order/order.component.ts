import { Component, OnInit, Inject } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  constructor(private npService: NovaPoshtaService, private cartService: CartService) {}

  form: FormGroup;

  private orderResult = { ready: false, message: '' };
  public formHasErrors = false;

  public selectedCity: NpItem = { Ref: '', Description: ''};
  public getCities = param => this.npService.getCities(param);
  public getOutlets = param => this.npService.getOutlets(param);
  public getId = (item: NpItem) => item.Ref;
  public getValue = (item: NpItem) => item.Description;

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      outlet: new FormControl('', Validators.required)
    });
  }

  onCitySelected(city: NpItem) {
    this.selectedCity = city;
  }

  onSubmit() {
    if (!this.form.hasError) {
      this.confirm();
    } else {
      this.formHasErrors = true;
    }
  }

  confirm() {
    const products = this.cartService.getAllCartItems();
    console.log(products);
    const message: Message = {
      form: this.form.value,
      products
    };

    console.log(message);

    const backendResponse = {
      code: 'OK',
      message: 'Заявка на Ваше замовлення № 34425'
    };

    this.orderResult.message = backendResponse.message;
    this.orderResult.ready = true;
    localStorage.clear();
    this.form.reset();
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
