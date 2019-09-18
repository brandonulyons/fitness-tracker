import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';


import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';


@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) { }

  initAuthListener() {
    this.firebaseAuth
        .authState
        .subscribe(user => {
          if (user) {
            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/training']);
          } else {
            this.trainingService.cancelSubscriptions();
            this.authChange.next(false);
            this.router.navigate(['/login']);
            this.isAuthenticated = false;
          }
        });
  }

  registerUser(authData: AuthData) {
    console.log('Signup:', authData);
    this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(
          authData.email,
          authData.password
        )
        .then(result => {
          console.log('result Signup:', result);
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        });
  }

  login(authData: AuthData) {
    console.log('Login:', authData);
    this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(
          authData.email,
          authData.password
        )
        .then(result => {
          console.log('result Login:', result);
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        });
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
