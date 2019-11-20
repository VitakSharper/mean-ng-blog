import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {User} from './helpers/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.setToken(token);
      this.authService.setCurrentUser(user);
      this.authService.getIsAuth().next({isAuth: true, user: this.authService.getCurrentUser().email});
    }
  }
}
