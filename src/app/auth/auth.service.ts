import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';


import { User } from './user.model';
import { AuthData } from './auth-data.model';


@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth
  ) { }

  registerUser(authData: AuthData) {
    this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(
          authData.email,
          authData.password
        )
        .then(result => {
          console.log(result);
          this.authSuccessfully();
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        });
  }

  login(authData: AuthData) {
    this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(
          authData.email,
          authData.password
        )
        .then(result => {
          console.log(result);
          this.authSuccessfully();
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        });
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
