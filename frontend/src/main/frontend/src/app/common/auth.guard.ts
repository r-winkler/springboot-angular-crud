import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {AuthService} from "./auth.service";
import {ToastrService} from "../common/toastr.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private _toastrService: ToastrService) {
  }

  canActivate(){
    if (this.authService.isLoggedIn()) {
      return true;
    }
    else {
      this._toastrService.info("You need to log in.");
      return false;
    }
  }
}
