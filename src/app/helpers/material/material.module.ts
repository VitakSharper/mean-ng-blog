import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

const matModules = [
  MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule,
  MatTooltipModule, MatExpansionModule, MatIconModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatPaginatorModule, MatSnackBarModule,
  MatDialogModule
];

@NgModule({
  imports: [matModules],
  exports: [matModules]
})
export class MaterialModule {
}
