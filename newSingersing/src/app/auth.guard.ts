import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate , CanActivateChild, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    console.log('his.authService.isLoggedIn===', this.authService.isLoggedIn)

    const tokenstr = window.sessionStorage.getItem('token');
    // console.log('tokendddddd==', tokenstr);
    // this.httpOptions.headers.set('token', tokenstr);
    // console.log('tokendddddd==', this.httpOptions.headers.get( 'token'));
    console.log('tokenstrn===', tokenstr)
    if (tokenstr !== undefined && tokenstr !== null) {
      return true;
    }
    // if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
  constructor(private authService: AuthService, private router: Router) {}
}
