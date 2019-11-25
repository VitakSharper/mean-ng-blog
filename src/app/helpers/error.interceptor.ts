import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SnackbarService} from './snackbar.service';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MsgDialogComponent} from './msg-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private dialogRef: any;

  constructor(
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('My error: ', error);
        this.dialogRef = this.dialog.open(MsgDialogComponent, {
          data: {
            error: error.error.message,
            status: error.statusText || 'fail'
          }
        });

        // this.snackbar.showSnack(error.error === undefined ? error : error.error.message, null, {duration: 5000});

        return throwError(error);
      })
    );
  }
}
