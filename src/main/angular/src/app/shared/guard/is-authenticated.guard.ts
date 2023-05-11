import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._authService.isLoggedIn.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          //redirect
          this._router.navigate(['login']);
        }
      })
    );
  }
}
