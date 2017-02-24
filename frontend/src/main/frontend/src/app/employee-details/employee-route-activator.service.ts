import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {EmployeeService} from "../employee/employee.service";
import 'rxjs/add/operator/map';


@Injectable()
export class EmployeeRouteActivator implements CanActivate {

  constructor(private _employeeService: EmployeeService, private _router: Router) {

  }

  // only activated if new employee is created => id=0 or when employee exists in DB
  canActivate(route: ActivatedRouteSnapshot) {
      return route.params['id'] == 0 || this._employeeService.getEmployee(route.params['id'])
        .map(employee => {
          const employeeExists = !!employee;
          if (!employeeExists) {
            this._router.navigate(['/404']);
          }
          return employeeExists;
        });
    }



}
