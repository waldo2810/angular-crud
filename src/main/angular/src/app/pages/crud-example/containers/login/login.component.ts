import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { IUser } from 'src/app/shared/model/interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  model!: IUser;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private _authService: AuthService, private _router: Router) {}

  get emailField(): AbstractControl | null {
    return this.form.get('email');
  }
  get passwordField(): AbstractControl | null {
    return this.form.get('password');
  }

  login() {
    if (this.form.invalid) {
      alert('Wrong user/password');
    }

    this._authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe(() => this._router.navigate(['list']));
  }
}
