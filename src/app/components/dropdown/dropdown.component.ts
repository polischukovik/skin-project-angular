import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: dropdownValidator,
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  public items = [];
  public selectedItemValue: string;
  public showDropdown = false;

  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: any) => Observable<[]>;
  @Output() selected = new EventEmitter<any>();
  @Input() getValue: (item: any) => string;
  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  getListItems(currentInput: string) {
    this.getService(currentInput).subscribe( data => this.items = data);
    this.showDropdown = true;
  }

  onClick(item: any) {
    this.selectedItemValue = this.getValue(item);
    this.selected.emit(item);
    this.propagateChange(item);
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  writeValue(item: any): void {
    if (item !== undefined) {
      this.selectedItemValue = this.getValue(item);
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {}
}

export function dropdownValidator(c: FormControl) {
  const err = {
    rangeError: {
      given: c.value,
      max: 10,
      min: 0
    }
  };

  return (c.value > 10 || c.value < 0) ? err : null;
}
