import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {SnackbarService} from '../../helpers/snackbar.service';

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
    private snackbar: SnackbarService
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
    this.authService.signUp(this.signupForm.value).subscribe((newUserData) => {
      this.authService.fetchLoggedUser(newUserData);
      this.signupForm.reset();
      this.snackbar.showSnack(`User ${newUserData.data.user.name} was successful created (●\'◡\'●)`, null);
    }, error => {
      this.snackbar.showSnack(error.error.message, null, {duration: 5000});
    });
  }
}
