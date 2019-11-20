import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {SnackbarService} from '../../helpers/snackbar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;


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

  createForm() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirm: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  submitHandler() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.signUp(this.signupForm.value).subscribe(() => {
      this.authService.getIsAuth().next({isAuth: true, user: this.authService.getCurrentUser().email});
      this.authService.saveAuthToLocalstorage();
      this.snackbar.showSnack(`User ${this.authService.getCurrentUser().name} was successful created (●\'◡\'●)`, null);
      this.route.navigate(['/posts']);
    }, error => {
      this.snackbar.showSnack(error.error.message, null, {duration: 5000});
    });
  }
}
