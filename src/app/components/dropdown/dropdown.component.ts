import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
    ,
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor, Validator {

  public items = [];
  public inputValue = '';
  public selectedItem: any;
  public showDropdown = false;

  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: any) => Observable<[]>;
  @Output() selected = new EventEmitter<any>();
  @Output() cleared = new EventEmitter<any>();
  @Input() getValue: (item: any) => string;

  onChange;
  onTouched;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value) { }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

  validate(control: FormControl) {
      return this.selectedItem === undefined ? { valid: false } : null;
  }

  getListItems() {
    if (this.inputValue.length < 2 ) { return; }
    this.getService(this.inputValue).subscribe( data => this.items = data);
    this.showDropdown = true;
  }

  onClick(item: any) {
    this.showDropdown = false;
    this.selectedItem = item;
    this.inputValue = this.getValue(item);
    this.selected.emit(item);
    this.onChange(item);
    this.onTouched();
    this.cleared.emit();
  }

  clickedOutside() {
    this.showDropdown = false;
    this.inputValue = this.selectedItem === undefined ? '' : this.getValue(this.selectedItem);
  }

}
