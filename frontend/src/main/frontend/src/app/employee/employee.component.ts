import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "./employee.service";
import {IEmployee} from "./employee.model";
import {ToastrService} from "../common/toastr.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: IEmployee[];
  errorMessage: string;

  constructor(private _employeeService: EmployeeService, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllEmployees();
    this._toastrService.info("Employee page loaded.")
  }

  getAllEmployees() {
    this._employeeService.getEmployees()
        .subscribe(
            employees => this.employees = employees,
            error => this.errorMessage = <any>error);
  }

  deleteEmployee(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      this._employeeService.deleteEmployee(id).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
      );
    }
  }

  onSaveComplete(): void {
    this.getAllEmployees();
  }

}
