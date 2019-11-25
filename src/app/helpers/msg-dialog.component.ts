import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  template: `
      <div style="border: 3px solid #EF9A9A;border-radius: 3px;padding: 18px 25px 25px 20px;">
          <h1 mat-dialog-title style="color:#EF9A9A" fxLayout fxLayoutAlign="center">{{passedData.status}}</h1>
          <mat-dialog-content fxLayout="column" fxLayoutAlign="center center">
              <p><strong>{{passedData.error}}</strong></p>
          </mat-dialog-content>
          <mat-dialog-actions fxLayout fxLayoutAlign="center">
              <button mat-icon-button color="warn" [mat-dialog-close]="true">
                  <mat-icon>check</mat-icon>
              </button>
          </mat-dialog-actions>
      </div>
  `
})

export class MsgDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }
}
