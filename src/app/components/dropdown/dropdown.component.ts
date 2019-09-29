import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styles: [`
    .input-group-text {
      width: 5rem;
    }

    .list-group-item:first-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 0;
    }

    .list-group{
      max-height: 300px;
      margin-bottom: 10px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `]
})
export class DropdownComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('input-name') inputName: string;
  @Input() getService: (param: any) => Observable<[]>;
  @Output() value: string;

  private items = [];

  constructor() { }

  ngOnInit() {
  }

  get(param) {
    this.getService(param).subscribe( (data) => { this.items = data; });
  }
}
