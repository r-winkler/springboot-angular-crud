import {Injectable} from "@angular/core";
@Injectable()
export class AuthService {

  loggedIn: boolean = false;

  login(user: string, password: string): boolean {
    if (user == 'admin' && password == 'admin') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): boolean {
    this.loggedIn = false;
    return true;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
}

}
