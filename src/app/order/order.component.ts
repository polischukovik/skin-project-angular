import { Component, OnInit, Inject } from '@angular/core';
import { NovaPoshtaService } from './novaPoshta.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  private orderCity = '';
  private selectedCityRef: string;
  private getCities = (param) => this.npService.getCities(param);
  private getOutlets = (param) => this.npService.getOutlets(param);
  private getId = (item: NpItem) => item.Ref;
  private getValue = (item: NpItem) => item.Description;

  constructor(private npService: NovaPoshtaService, public dialog: MatDialog) {}

  ngOnInit() { }

  confirm() {
    // let dialogRef = this.dialog.open(UserProfileComponent, {
    //   height: '400px',
    //   width: '600px',
    // });
  }

  onCitySelected(cityRef: string) {
    this.selectedCityRef = cityRef;
  }

}

interface NpItem {
  Ref: string;
  Description: string;
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }

// export interface DialogData {
//   animal: string;
//   name: string;
// }
