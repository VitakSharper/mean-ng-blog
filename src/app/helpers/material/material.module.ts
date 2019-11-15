import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule, MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

const matModules = [
  MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule,
  MatTooltipModule, MatExpansionModule, MatIconModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule
];

@NgModule({
  imports: [matModules],
  exports: [matModules]
})
export class MaterialModule {
}
