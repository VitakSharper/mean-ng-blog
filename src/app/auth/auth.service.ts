import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../helpers/interfaces';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlDb = `${environment.nodeUrl}users`;
  currentUser: User = null;

  constructor(
    private http: HttpClient
  ) {
  }

  fetchLoggedUser(userData: any) {
    this.currentUser = {
      name: userData.data.user.name,
      email: userData.data.user.email,
      token: userData.data.token
    };
  }

  signUp(newUser: User): Observable<any> {
    return this.http.post<{ data: any, token: string }>(`${this.urlDb}/signup`, newUser);
  }

  logIn(user: User): Observable<any> {
    return this.http.post<{ data: any, token: string }>(`${this.urlDb}/login`, user);
  }
}
