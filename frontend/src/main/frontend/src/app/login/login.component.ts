import {Component, OnInit, Input} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {ToastrService} from "../common/toastr.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginText: string = "Login";
  logoutText: string = "Logout";

  constructor(private oAuthService: OAuthService, private toastrService: ToastrService) {

  }

  login(): void {
    this.oAuthService.initImplicitFlow();
  }

  logout(): void {
    this.oAuthService.logOut();
  }

  public get name() {
    let claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims.given_name;
  }

}
