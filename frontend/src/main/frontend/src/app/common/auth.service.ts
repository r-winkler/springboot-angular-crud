import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {ToastrService} from "./toastr.service";

@Injectable()
export class AuthService {

  constructor(private http: Http, private _toastrService: ToastrService) {

  }

  private authState: AuthState = null;
  private authUrl: string = 'http://localhost:8090/auth/realms/master/protocol/openid-connect/token';

  login(username: string, password: string): Observable<Response> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'service');
    body.set('username', username);
    body.set('password', password);

    return this.http.post(this.authUrl, body, {headers: headers})
      .map((response: Response) => this.extractData(response))
      .map(data => this.parseAuthState(data))
      .catch(this.handleError);
  }

  logout(): boolean {
    this.authState = null;
    return true;
  }

  isLoggedIn(): boolean {
    return !!this.authState;
  }

  public getAuthHeaders(): Headers {
    return new Headers({'Authorization': 'Bearer ' + this.authState.access_token})
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private extractData(response: Response) {
    let body;
    try {
      body = response.json();
    }
    catch (e) {
      body = null;
    }
    return body;
  }

  private parseAuthState(data: any): void {
    this.authState = <AuthState>{};
    this.authState.access_token = data.access_token;
    this.authState.expires_in = data.expires_in;
    this.authState.id_token = data.id_token;
    this.authState.session_state = data.session_state;
    this.authState.token_type = data.token_type;
    this.authState.refresh_expires_in = data.refresh_expires_in;
    this.authState.refresh_token = data.refresh_token;
  }

}

interface AuthState {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
  "not-before-policy": number;
  session_state: string
  refresh_expires_in: number,
  refresh_token: string
}
