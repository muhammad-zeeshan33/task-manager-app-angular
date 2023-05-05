import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { tokenGetter } from '../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnChanges {
  token: any = tokenGetter();

  tokenAssigner() {
    let token = tokenGetter();
    this.token = token;
  }

  ngOnInit() {
    this.tokenAssigner();
  }

  ngOnChanges() {
    this.tokenAssigner();
  }

  constructor(public _authService: AuthService, private router: Router) {
    console.log(_authService.isLoggedIn);
    console.log(this.token);
  }

  logout() {
    this._authService.logout();
  }
}
