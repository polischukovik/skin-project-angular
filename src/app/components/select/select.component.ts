import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: [`
    .input-group-text {
      width: 5rem;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: string) => Observable<[]>;
  @Input() getValue: () => string;
  @Input() getId: () => string;
  onChange: any = () => {};
  onTouched: any = () => {};

  private items = [];

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public set value(val: string) {
    if (val) {
      this.get(val);
    }
  }

  get(param) {
    this.getService(param).subscribe( (data) =>  this.items = data );
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
