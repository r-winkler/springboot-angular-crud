import {Injectable} from '@angular/core';
import {IEmployee} from "./employee.model";
import {Http, Response, Headers, RequestOptions, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {OAuthService} from "angular-oauth2-oidc";


@Injectable()
export class EmployeeService {

  private _baseUrl = 'api/employee';

  constructor(private _http: Http, private oAuthService: OAuthService) {
  }

  private getAuthHeader() {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.oAuthService.getAccessToken());
    return headers;
  }

  getEmployees(): Observable<IEmployee[]> {
    let headers = this.getAuthHeader();
    return this._http.get(this._baseUrl, {headers}).map((response: Response) => <IEmployee[]>response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEmployee(id: number): Observable<IEmployee> {
    if (id == 0) {
      return Observable.of(this.initializeEmployee());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeEmployee());
      //     observer.complete();
      // });
    }
    ;
    let headers = this.getAuthHeader();
    const url = `${this._baseUrl}/${id}`;
    return this._http.get(url, {headers})
      .map((response: Response) => this.extractData(response))
      .do(data => console.log('getEmployee: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteEmployee(id: number): Observable<Response> {
    let headers = this.getAuthHeader();
    const url = `${this._baseUrl}/${id}`;
    return this._http.delete(url, {headers})
      .do(data => console.log('deleteEmployee: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveEmployee(employee: IEmployee): Observable<IEmployee> {
    if (employee.id == null) { // id is null or undefined
      return this.createEmployee(employee);
    }
    return this.updateEmployee(employee);
  }

  private createEmployee(employee: IEmployee): Observable<IEmployee> {
    employee.id = undefined;
    console.log(employee);
    let headers = this.getAuthHeader();
    return this._http.post(this._baseUrl, employee, {headers})
      .map(this.extractData)
      .do(data => console.log('createEmployee: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateEmployee(employee: IEmployee): Observable<IEmployee> {
    const url = `${this._baseUrl}/${employee.id}`;
    let headers = this.getAuthHeader();
    return this._http.put(url, employee, {headers})
      .map(() => employee)
      .do(data => console.log('updateEmployee: ' + JSON.stringify(data)))
      .catch(this.handleError);
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

  initializeEmployee(): IEmployee {
    return {
      id: null,
      firstName: null,
      lastName: null,
      profession: null,
      age: null,
      fullTime: false,
      language: null
    };
  }


}
