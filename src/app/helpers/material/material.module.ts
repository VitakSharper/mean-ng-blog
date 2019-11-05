import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

const matModules = [
  MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule,
  MatTooltipModule, MatExpansionModule, MatIconModule
];

@NgModule({
  imports: [matModules],
  exports: [matModules]
})
export class MaterialModule {
}
