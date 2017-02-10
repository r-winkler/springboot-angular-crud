import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "./employee.service";
import {IEmployee} from "./employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: IEmployee[];
  errorMessage: string;

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this._employeeService.getEmployees()
        .subscribe(
            employees => this.employees = employees,
            error => this.errorMessage = <any>error);
  }

}
