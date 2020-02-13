import { Component, OnInit, Input, forwardRef, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SelectComponent,
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor, Validator {

  public items = [];
  public selectedItem: any;
  public currentValue: any;

  onChange;
  onTouched;

  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: string) => Observable<[]>;
  @Input() getValue: (item: any) => string;

  constructor() { }

  ngOnInit() {
    this.selectedItem = undefined;
  }

  writeValue(value) {
    this.selectedItem = undefined;
    this.currentValue = value;
  }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

  validate(control: FormControl) {
    return this.selectedItem === undefined ? { valid: false } : null;
  }

  @Input()
  public set forRoot(rootVal: string) {
    if (rootVal) {
      this.getService(rootVal).subscribe( data =>  this.items = data );
    }
  }

  onSelect(item: any) {
    this.selectedItem = JSON.parse(item);
    this.onChange(this.selectedItem);
    this.onTouched();
  }

  public clear() {
    this.selectedItem = undefined;
    this.onChange(this.selectedItem);
    this.onTouched();
  }

  showInfo() {
    $('#infoModal').modal('show');
  }

}
