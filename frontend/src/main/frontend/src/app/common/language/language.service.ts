import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {ILanguage} from "./language.model";


@Injectable()
export class LanguageService {

  private _baseUrl = 'api/language';

  constructor(private _http: Http) {
  }

  getLanguages(): Observable<string[]> {
    return this._http.get(this._baseUrl).map((response: Response) => <ILanguage[]>response.json())
      .map(objectArray => objectArray.map(object => object.language))
      .do(data => console.log('Languages: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
