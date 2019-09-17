import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';


import { User } from './user.model';
import { AuthData } from './auth-data.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

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
        .then(value => {
          console.log('Success!', value);
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
        .then(value => {
          console.log('Nice, it worked!');
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        });
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
