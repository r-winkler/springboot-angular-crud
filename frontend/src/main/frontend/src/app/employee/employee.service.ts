import {Injectable} from '@angular/core';
import {IEmployee} from "./employee";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class EmployeeService {
    private _baseUrl = 'api/employees';

    constructor(private _http: Http) {
    }

    getEmployees(): Observable<IEmployee[]> {
        return this._http.get(this._baseUrl).map(this.extractData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEmployee(id: number): Observable<IEmployee> {
        if (id === 0) {
            return Observable.of(this.initializeEmployee());
            // return Observable.create((observer: any) => {
            //     observer.next(this.initializeProduct());
            //     observer.complete();
            // });
        };
        const url = `${this._baseUrl}/${id}`;
        return this._http.get(url)
            .map(this.extractData)
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    initializeEmployee(): IEmployee {
        // Return an initialized object
        return {
            id: 0,
            firstname: "",
            lastname: "",
            profession: "",
            age: 0
        };
    }


}
