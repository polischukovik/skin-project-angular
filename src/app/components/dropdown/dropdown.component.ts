import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: any) => Observable<[]>;
  @Output() selected = new EventEmitter<any>();
  @Input() getValue: (item: object) => string;
  @Input() getId: (item: object) => string;

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
}
