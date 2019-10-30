import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: [`
    .input-group-text {
      width: 5rem;
    }
  `]
})
export class SelectComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: string) => Observable<[]>;
  @Input() getValue: () => string;
  @Input() getId: () => string;

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
}