import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {EmployeeService} from "../employee/employee.service";
import 'rxjs/add/operator/map';


@Injectable()
export class EmployeeRouteActivator implements CanActivate {

  constructor(private _employeeService: EmployeeService, private _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this._employeeService.getEmployee(route.params['id'])
      .map(employee => {
        const employeeExists = !!employee;
        if (!employeeExists) {
          this._router.navigate(['/404']);
        }
        return employeeExists;
      });

    }

}
