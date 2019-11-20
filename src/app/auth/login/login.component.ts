import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {SnackbarService} from '../../helpers/snackbar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  submitHandler() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.logIn(this.loginForm.value)
    // TODO ADD SPINNER ON THE LOGIN BUTTON
      .subscribe(() => {
        this.authService.getIsAuth().next({isAuth: true, user: this.authService.getCurrentUser().email});
        this.authService.saveAuthToLocalstorage();
        this.route.navigate(['/posts']);
        this.snackbar.showSnack(`Welcome ${this.authService.getCurrentUser().email}, you are now logged in. (●'◡'●)`, null);
      }, error => this.snackbar.showSnack(error.error === undefined ? error : error.error.message, null, {duration: 5000}));
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }
}
