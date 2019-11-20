import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) {
  }

  showSnack(message, action, config = {duration: 3000}) {
    this.snackbar.open(message, action, config);
  }
}
