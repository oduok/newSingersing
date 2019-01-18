import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Login} from './login';


import {Observable} from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  userName = '';
  passwd = '';

  // @ts-ignore
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }


  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    const login: Login = {userName: this.userName, passwd: this.passwd};
    window.sessionStorage.removeItem('token');
    this.authService.login(login, this.router);
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }


  ngOnInit() {
  }
}
