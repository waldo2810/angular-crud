import { Injectable } from '@angular/core';
import { CrudExampleService } from '../crud-example/crud-example.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'auth-token';
  isLoggedIn = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private _crudExampleService: CrudExampleService) {
    this._isLoggedIn$.next(!!this.token);
  }

  login(email: string, password: string) {
    return this._crudExampleService.login(email, password).pipe(
      tap((res: any) => {
        console.log(res.token);
        localStorage.setItem(this.TOKEN_NAME, res.token);
        this._isLoggedIn$.next(true);
      })
    );
  }
}
