import { Injectable } from '@angular/core';
import {delay, tap} from 'rxjs/operators';
import {Observable, of, pipe, of as observableOf, from} from 'rxjs';
import {HttpService} from './http.service';
import {Login} from './login/login';
import {promise} from 'selenium-webdriver';
import delayed = promise.delayed;
import {fromArray} from 'rxjs/internal/observable/fromArray';
import {Router} from '@angular/router';
import {PhaseVO} from './course/phase-vo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  isLoggedIn: Observable<boolean>;
  token: string;
  login(login: Login, router: Router): void {
    const loginUrl = '/user/login';
  this.http.post(loginUrl, login).subscribe((data: any) => {
      if (data.message) {
        this.isLoggedIn = of(false);
      } else {
        this.token = data.token;
        this.isLoggedIn = of(true);
        window.sessionStorage.setItem('token',  data.token );
        const redirect = this.redirectUrl ? this.redirectUrl : '';
        router.navigate([redirect]);
      }
    }) ;
  }

  logout(): void {
    this.isLoggedIn  = of(false);
  }
  constructor(private  http: HttpService) { }
}
