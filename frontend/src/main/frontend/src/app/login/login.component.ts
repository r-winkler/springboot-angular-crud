import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../common/auth.service";
import {ToastrService} from "../common/toastr.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginText: string;
  logoutText: string;

  username: string;
  password: string;

  constructor(private _authService: AuthService, private _toastrService: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginText = "Login";
    this.logoutText = "Logout";
  }

  login(): void {
    if (this._authService.login(this.username, this.password)) {
      this._toastrService.success('Logged in');
      this.reset();
    }
    else {
      this._toastrService.error('Could not log in. Please check username and password. Default is admin/admin.');
    }
  }

  logout(): void {
    if (this._authService.logout()){
      this.router.navigateByUrl('/welcome');
      this._toastrService.info('Logged out');
    }
    else {
      this._toastrService.info('Could not log out. Try again.');
    }
  }

  reset(): void {
    this.username = "";
    this.password = "";
  }

}
