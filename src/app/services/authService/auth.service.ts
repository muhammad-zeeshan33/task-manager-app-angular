import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  url: string = 'http://localhost:3000/auth';
  login(email: string, password: string) {
    return this.http
      .post(`${this.url}/login`, {
        email,
        password,
      })
      .pipe(
        map((res: any) => {
          if (res) {
            localStorage.setItem('token', res.token);
            this.isLoggedIn = true;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post(`${this.url}/register`, {
        name,
        email,
        password,
      })
      .pipe(
        map((res: any) => {
          if (res) {
            localStorage.setItem('token', res.token);
            this.isLoggedIn = true;
          }
        })
      );
  }
}
