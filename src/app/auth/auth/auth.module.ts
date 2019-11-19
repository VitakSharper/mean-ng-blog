import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../helpers/material/material.module';
import {FlexModule} from '@angular/flex-layout';
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {LayoutComponent} from '../layout/layout.component';


@NgModule({
  declarations: [LayoutComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexModule,
    AuthRoutingModule
  ],
  exports: [LayoutComponent, LoginComponent, SignupComponent]
})
export class AuthModule {
}
