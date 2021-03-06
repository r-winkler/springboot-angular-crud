import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private oAuthService: OAuthService) {
  }

  canActivate(){
    if (this.oAuthService.hasValidAccessToken()) {
      return true;
    }
    else {
      this.oAuthService.initImplicitFlow();
      return false;
    }
  }
}
