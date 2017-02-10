import {Injectable} from '@angular/core';
import {IEmployee} from "./employee";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class EmployeeService {
    private _employeesUrl = 'api/employees.json';

    constructor(private _http: Http) {
    }

    getEmployees(): Observable<IEmployee[]> {
        return this._http.get(this._employeesUrl).map((response: Response) => <IEmployee[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
