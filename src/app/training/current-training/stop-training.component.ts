import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title fxLayout fxLayoutAlign="center">Are you sure?</h1>
              <mat-dialog-content fxLayout fxLayoutAlign="center">
                <p>You already got {{ passedData.progress }} %</p>
              </mat-dialog-content>
              <mat-dialog-actions fxLayout fxLayoutAlign="center">
                <button mat-button [mat-dialog-close]="true">Yes</button>
                <button mat-button [mat-dialog-close]="false">No</button>
              </mat-dialog-actions>`
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {

  }
}
