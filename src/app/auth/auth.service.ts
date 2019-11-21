import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../helpers/interfaces';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlDb = `${environment.apiUrl}users`;
  private currentUser: User = null;
  private token = null;
  helper = new JwtHelperService();

  private isAuth = new Subject<{ isAuth: boolean, user: string }>();

  constructor(
    private http: HttpClient
  ) {
  }

  getIsAuth() {
    return this.isAuth;
  }

  getToken(): string {
    const decodedToken = this.helper.decodeToken(this.token);
    const expirationDate = this.helper.getTokenExpirationDate(this.token);
    return this.token;
  }

  isTokenExpired() {
    return !this.helper.isTokenExpired(this.token);
  }

  setToken(value: string) {
    this.token = value;
  }

  getCurrentUser(): User {
    return {name: this.currentUser.name, email: this.currentUser.email};
  }

  setCurrentUser(value: User) {
    this.currentUser = value;
  }

  fetchLoggedUser({userData}: { userData: any }) {
    this.currentUser = {
      name: userData.data.user.name,
      email: userData.data.user.email
    };
    this.token = userData.token;
  }

  signUp(newUser: User): Observable<any> {
    return this.http.post(`${this.urlDb}/signup`, newUser)
      .pipe
      (map((resp: any) => {
        this.fetchLoggedUser({userData: resp});
      }));
  }

  logIn(user: User): Observable<any> {
    return this.http.post(`${this.urlDb}/login`, user)
      .pipe(
        map((resp: any) => {
          if (resp) {
            this.fetchLoggedUser({userData: resp});
          }
        }));
  }

  resetConnexion() {
    console.log('in reset connexion');
    this.currentUser = null;
    this.token = null;
    this.getIsAuth().next({isAuth: false, user: null});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  saveAuthToLocalstorage() {
    localStorage.setItem('token', this.getToken());
    localStorage.setItem('user', JSON.stringify(this.getCurrentUser()));
  }

}
