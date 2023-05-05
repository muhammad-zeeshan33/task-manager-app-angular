import { Component } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login() {
    if (this.email === '' || this.password === '') {
      this.toastr.error('Please fill in all fields', 'Error');
      return;
    }
    this._authService.login(this.email, this.password).subscribe(
      (res: any) => {
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.toastr.error('An error occurred: ' + err.error.message, 'Error');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.toastr.error('Server error: ' + err.error.message, 'Error');
        }
      }
    );
  }
}
