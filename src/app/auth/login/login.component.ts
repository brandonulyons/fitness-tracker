import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        { validators: [Validators.required, Validators.email],
          asyncValidators: [this.forbiddenEmails] }),
      password: new FormControl('',
        { validators: [Validators.required] })
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const forbiddenUsernames = ['aaa@bbb.com', 'fff@ggg.com'];
      if (forbiddenUsernames.includes(control.value)) {
        resolve({ emailIsForbidden: true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  onLogin(form: NgForm) {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
