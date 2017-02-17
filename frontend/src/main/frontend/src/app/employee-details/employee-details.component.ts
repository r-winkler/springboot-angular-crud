import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IEmployee} from "../employee/employee.model";
import {EmployeeService} from "../employee/employee.service";
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

/* Custom Validator */
function primaryLanguageValidator(c: AbstractControl): {[key: string]:boolean} | null {
  if(c.value === 'default') {
    return { 'primaryLanguage': true}
  };
  return null;
};

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeForm: FormGroup;
  firstNameMessage: string;
  languages = ['German', 'French', 'English'];
  private validationMessages = {
    required: 'Firstname is required.',
    minlength: 'Firstname must be at least 3 characters.'
  };
  model: IEmployee;
  employee: IEmployee;
  errorMessage: string;

  constructor(private _employeeService: EmployeeService, private _route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this._employeeService.getEmployee(this._route.snapshot.params['id'])
      .subscribe(
      employee => this.employee = employee,
      error => this.errorMessage = <any>error);

    this.employeeForm = this.fb.group({
      firstName: ['René', [Validators.required, Validators.minLength(3)]],
      lastName: ['Winkler', Validators.required],
      isFullTime: true,
      paymentType: 'w2',
      primaryLanguage: ['default', primaryLanguageValidator]
    });

    const lastNameControl = this.employeeForm.get('lastName');
    lastNameControl.valueChanges.distinctUntilChanged().subscribe(value => this.lastNameToUpperCase(lastNameControl.value));

    const firstNameControl = this.employeeForm.get('firstName');
    firstNameControl.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(firstNameControl));
  }

  lastNameToUpperCase(value: string) {
    if(value.length > 0)
      this.employeeForm.patchValue({lastName: value.charAt(0).toUpperCase() + value.slice(1)});
    else
      this.employeeForm.patchValue({lastName: value});
  }

  submitForm() {
    console.log('Saved: ' + JSON.stringify(this.employeeForm.value));
    console.log(this.employeeForm);


  }

  setMessage(c: AbstractControl): void {
    this.firstNameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.firstNameMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
    }
  }

}
