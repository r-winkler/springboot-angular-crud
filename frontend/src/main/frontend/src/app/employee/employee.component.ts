import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee.service";
import {IEmployee} from "./employee.model";
import {ToastrService} from "../common/toastr.service";
import {IEmployeeFilter} from "./employee-filter.model";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],

})
export class EmployeeComponent implements OnInit {

  employees: IEmployee[];
  errorMessage: string;
  employeeFilterMap: any = {};
  employeeFilter: IEmployeeFilter;

  constructor(private _employeeService: EmployeeService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this.employeeFilter = this.initializeEmployeeFilter();
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
      if (window.confirm("Do you really want to delete this Employee?")) {
        this._employeeService.deleteEmployee(id).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  onSaveComplete(): void {
    this.getAllEmployees();
  }

  buildFilter(): any {
    let employeeFilterMap: any = {};
    for (let filter in this.employeeFilter) {
      let value = this.employeeFilter[filter];
      if (value != null && value != "") {
        employeeFilterMap[filter] = value;
      }
    }
    return employeeFilterMap;
  }

  filterChanged(event): void {
    this.employeeFilterMap = this.buildFilter();
  }

  initializeEmployeeFilter(): IEmployeeFilter {
    return {
      id: '',
      firstName: '',
      lastName: '',
      profession: '',
      age: '',
      language: ''
    };
  }

}
