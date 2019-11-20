import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthSub: Subscription;
  isAuth = false;
  currentUser = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isAuth = !!this.authService.getToken();
    if (this.isAuth) {
      this.currentUser = this.authService.getCurrentUser().email;
    }
    this.isAuthSub = this.authService.getIsAuth()
      .subscribe((currentUser) => {
        this.isAuth = currentUser.isAuth;
        this.currentUser = currentUser.user;
      });
  }

  onLogout() {
    this.authService.resetCurrentUser();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.isAuthSub.unsubscribe();
  }
}
