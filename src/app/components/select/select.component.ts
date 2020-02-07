import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  public items = [];
  public selectedItemValue: string;

  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: string) => Observable<[]>;
  @Input() getValue: (item: any) => string;
  onChange: any = () => {};
  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public set forRoot(rootVal: string) {
    if (rootVal) {
      this.getService(rootVal).subscribe( data =>  this.items = data );
    }
  }

  onSelect(item: any) {
    this.propagateChange(JSON.parse(item));
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
