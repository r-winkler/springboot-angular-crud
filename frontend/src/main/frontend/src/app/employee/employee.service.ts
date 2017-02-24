import {Injectable} from '@angular/core';
import {IEmployee} from "./employee.model";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class EmployeeService {

  private _baseUrl = 'api/employee';

  constructor(private _http: Http) {
  }

  getEmployees(): Observable<IEmployee[]> {
    return this._http.get(this._baseUrl).map((response: Response) => <IEmployee[]>response.json())
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
    const url = `${this._baseUrl}/${id}`;
    return this._http.get(url)
      .map((response: Response) => this.extractData(response))
      .do(data => console.log('getEmployee: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteEmployee(id: number): Observable<Response> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    const url = `${this._baseUrl}/${id}`;
    return this._http.delete(url, options)
      .do(data => console.log('deleteEmployee: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveEmployee(employee: IEmployee): Observable<IEmployee> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    if (employee.id == null) { // id is null or undefined
      return this.createEmployee(employee, options);
    }
    return this.updateEmployee(employee, options);
  }

  private createEmployee(employee: IEmployee, options: RequestOptions): Observable<IEmployee> {
    employee.id = undefined;
    console.log(employee);
    return this._http.post(this._baseUrl, employee, options)
      .map(this.extractData)
      .do(data => console.log('createEmployee: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateEmployee(employee: IEmployee, options: RequestOptions): Observable<IEmployee> {
    const url = `${this._baseUrl}/${employee.id}`;
    return this._http.put(url, employee, options)
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
