import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../common/auth.service";
import {ToastrService} from "../common/toastr.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginText: string = "Login";
  logoutText: string = "Logout";

  username: string;
  password: string;

  constructor(private _authService: AuthService, private _toastrService: ToastrService, private router: Router) {

  }

  login(): void {
    this._authService.login(this.username, this.password)
      .subscribe(
        () => this.onLoginSuccess(),
        (error: any) => this.onLoginError(<string>error));

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

  onLoginSuccess() : void {
    this._toastrService.success('Logged in');
    this.reset();
  }


  onLoginError(error: string): void {
    this._toastrService.error('Could not log in. Please check username and password and make sure Keycloak is running.');
  }

}
