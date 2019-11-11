import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: any) => Observable<[]>;
  @Output() selected = new EventEmitter<any>();
  @Input() getValue: (item: object) => string;
  @Input() getId: (item: object) => string;
  onChange: any = () => {};
  onTouched: any = () => {};

  private items = [];

  constructor() { }

  ngOnInit() {
  }

  get(param) {
    this.getService(param).subscribe( (data) => { this.items = data; });
  }

  onClick(item: any) {
    this.selected.emit(item);
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
