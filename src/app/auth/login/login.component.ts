import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        { validators: [Validators.required, Validators.email],
          asyncValidators: [this.forbiddenEmails] }),
      password: new FormControl('',
        { validators: [Validators.required] })
    });
  }

  onLogin() {
    console.log(this.loginForm);
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
}
