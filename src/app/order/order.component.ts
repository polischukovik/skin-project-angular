import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import 'bootstrap';
import * as $ from 'jquery';
import { Order } from './order';
import { OrderService } from './OrderService';
import * as uuid from 'uuid';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, AfterViewChecked {

  constructor(
      private npService: NovaPoshtaService
    , private cartService: CartService
    , private orderService: OrderService) {}

  form: FormGroup;

  public orderResult = { message: undefined };
  public orderErrors = [];

  public selectedCity: NpItem = { Ref: '', Description: ''};
  public getCities = param => this.npService.getCities(param);
  public getOutlets = param => this.npService.getOutlets(param);
  public getId = (item: NpItem) => item.Ref;
  public getValue = (item: NpItem) => item.Description;

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      city: new FormControl(''),
      outlet: new FormControl('')
    });
    this.form.statusChanges.subscribe( event => this.onStatusChange() );
  }

  ngAfterViewChecked(): void {
    $('[data-toggle="popover"]').popover({ trigger: 'manual', placement: 'top' });
  }

  onCitySelected(city: NpItem) {
    this.selectedCity = city;
  }

  onSubmit() {
    this.orderErrors = [];

    this.challangeControlValid('fullName');
    this.challangeControlValid('phone');
    this.challangeControlValid('city');
    this.challangeControlValid('outlet');

    if (!this.form.valid) {
      this.orderErrors.push('Замовлення містить помилки');
    }

    if (this.cartService.empty) {
      this.orderErrors.push('Кошик порожній');
    }

    if (this.form.valid && !this.cartService.empty) {
      this.confirm();
    }
  }

  confirm() {
    const products = this.cartService.getAllCartItems();
    console.log(products);
    const order: Order = {
      uuid: uuid.v4(),
      submitedDate: new Date(),
      customerName: this.form.value.fullName,
      phone: this.form.value.phone,
      city: this.form.value.city.Description,
      outlet: this.form.value.outlet.Description,
      status: 'ENTERED',
      products: this.cartService.getProducts()
    };

    this.orderService.createOrder(order)
      .subscribe( response => this.orderResult.message =  `Заявка на Ваше замовлення № ${response.uuid}` );

    localStorage.clear();
    this.form.reset();
  }

  onStatusChange() {
    this.challangeControlValidPristine('fullName');
    this.challangeControlValidPristine('phone');
    this.challangeControlValidPristine('city');
    this.challangeControlValidPristine('outlet');
  }

  challangeControlValidPristine(name: string) {
    const el = $(`[formControlName="${name}"]`);

    if ( this.form.controls[name].valid || this.form.controls[name].pristine ) {
      el.popover('hide');
    } else {
      el.popover('show');
    }
  }

  challangeControlValid(name: string) {
    const el = $(`[formControlName="${name}"]`);
    if ( this.form.controls[name].valid ) {
      el.popover('hide');
    } else {
      el.popover('show');
    }
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
