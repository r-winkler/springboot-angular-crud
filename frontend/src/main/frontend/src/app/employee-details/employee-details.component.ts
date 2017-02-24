import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IEmployee} from "../employee/employee.model";
import {EmployeeService} from "../employee/employee.service";
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {LanguageService} from "../common/language/language.service";
import {Observable} from "rxjs";
import {ToastrService} from "../common/toastr.service";


/* Custom Validator */
function languageValidator(c: AbstractControl): {[key: string]:boolean} | null {
  if(c.value === 'default') {
    return { 'language': true}
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
  languages = [];
  errorMessage: string;
  private validationMessages = {
    required: 'Firstname is required.',
    minlength: 'Firstname must be at least 3 characters.'
  };
  employee: IEmployee;

  constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute,
              private fb: FormBuilder,
              private _languageService: LanguageService,
              private _toastrService: ToastrService) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      id: [],
      firstName: [, [Validators.required, Validators.minLength(3)]],
      lastName: [, Validators.required],
      age: [],
      profession: [],
      fullTime: [],
      language: [, languageValidator]
    });

    let languages = this._languageService.getLanguages();
    let employee = this._employeeService.getEmployee(this._route.snapshot.params['id']);


    Observable.zip(
      languages,
      employee,
      (languages, employee) => {
        this.languages = languages;
        this.employee = employee;
        const selectedLanguage = this.languages.find(language => language === this.employee.language);
        this.employee.language = selectedLanguage;
        this.employeeForm.setValue(this.employee);
      }
    ).subscribe();



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

  save() {
    this._employeeService.saveEmployee(this.employeeForm.value).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSaveComplete(): void {
    this._toastrService.success('Employee saved.');
    this._router.navigate(['/employee/']);
  }

  setMessage(c: AbstractControl): void {
    this.firstNameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.firstNameMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
    }
  }

}
