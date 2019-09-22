import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styles: [`
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
  @Input() getService;

  constructor() { }

  ngOnInit() {
  }

}
