import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from '../signup/signup.component';
import {LoginComponent} from '../login/login.component';
import {LayoutComponent} from '../layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
