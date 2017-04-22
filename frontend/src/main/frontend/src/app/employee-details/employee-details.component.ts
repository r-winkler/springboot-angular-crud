import {Component, OnInit} from '@angular/core';
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
function languageValidator(c: AbstractControl): {[key: string]: boolean} | null {
  if (c.value === 'default') {
    return {'language': true}
  }
  ;
  return null;
};

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeForm: FormGroup;
  firstNameMessage: string;
  lastNameMessage: string;
  ageMessage: string;
  professionMessage: string;
  languages = [];
  private firstNameValidationMessages = {
    required: 'Firstname is required.',
    minlength: 'Firstname must be at least 3 characters.',
    pattern: 'Firstname must contain only characters.'
  };
  private lastNameValidationMessages = {
    required: 'Lastname is required.',
    minlength: 'Lastname must be at least 3 characters.',
    pattern: 'Lastname must contain only characters.'
  };
  private ageValidationMessages = {
    required: 'Age is required.',
    pattern: 'Age must contain only characters and be in range between 0-99.'
  };
  private professionValidationMessages = {
    required: 'Profession is required.',
    minlength: 'Profession must be at least 3 characters.',
    pattern: 'Profession must contain only characters.'
  };
  employee: IEmployee;

  constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute,
              private fb: FormBuilder,
              private _languageService: LanguageService,
              private _toastrService: ToastrService) {
  }

  ngOnInit() {

    let onlyText = Validators.pattern('[a-zA-ZñÑáéíóúü\\-çÇ\\s]*');

    this.employeeForm = this.fb.group({
      id: [],
      firstName: [, [Validators.required, Validators.minLength(3), onlyText]],
      lastName: [, [Validators.required, Validators.minLength(3), onlyText]],
      age: [, [Validators.required, Validators.pattern('[0-9]{1,2}')]],
      profession: [, [Validators.required, onlyText]],
      fullTime: [],
      language: [, [languageValidator, Validators.required]]
    });

    let languages = this._languageService.getLanguages().subscribe(languages => this.languages = languages);

    let employee = this._employeeService.getEmployee(this._route.snapshot.params['id']).subscribe(employee => {
      this.employee = employee;
      if (this.employee.language != null) {
        const selectedLanguage = this.languages.find(language => language === this.employee.language);
        this.employee.language = selectedLanguage;
      }
      this.employeeForm.setValue(this.employee);
    });


    // Observable.zip(
    //   languages,
    //   employee,
    //   (languages, employee) => {
    //     this.languages = languages;
    //     this.employee = employee;
    //     const selectedLanguage = this.languages.find(language => language === this.employee.language);
    //     this.employee.language = selectedLanguage;
    //     this.employeeForm.setValue(this.employee);
    //   }
    // ).subscribe();

    const firstNameControl = this.employeeForm.get('firstName');
    firstNameControl.valueChanges.distinctUntilChanged().subscribe(value => this.firstNameToUpperCase(firstNameControl.value));
    firstNameControl.valueChanges.debounceTime(1000).subscribe(value => this.setFirstNameMessage(firstNameControl));

    const lastNameControl = this.employeeForm.get('lastName');
    lastNameControl.valueChanges.distinctUntilChanged().subscribe(value => this.lastNameToUpperCase(lastNameControl.value));
    lastNameControl.valueChanges.debounceTime(1000).subscribe(value => this.setLastNameMessage(lastNameControl));

    const ageControl = this.employeeForm.get('age');
    ageControl.valueChanges.debounceTime(1000).subscribe(value => this.setAgeMessage(ageControl));

    const professionControl = this.employeeForm.get('profession');
    professionControl.valueChanges.distinctUntilChanged().subscribe(value => this.professionToUpperCase(professionControl.value));
    professionControl.valueChanges.debounceTime(1000).subscribe(value => this.setProfessionMessage(professionControl));

  }

  firstNameToUpperCase(value: string) {
    if (value.length > 0)
      this.employeeForm.patchValue({firstName: value.charAt(0).toUpperCase() + value.slice(1)});
  }

  lastNameToUpperCase(value: string) {
    if (value.length > 0)
      this.employeeForm.patchValue({lastName: value.charAt(0).toUpperCase() + value.slice(1)});
  }

  professionToUpperCase(value: string) {
    if (value.length > 0)
      this.employeeForm.patchValue({profession: value.charAt(0).toUpperCase() + value.slice(1)});
  }

  save() {
    this._employeeService.saveEmployee(this.employeeForm.value).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.onError(<string>error)
    );
  }

  onSaveComplete(): void {
    this._toastrService.success('Employee saved.');
    this._router.navigate(['/employee/']);
  }

  onError(error: string): void {
    this._toastrService.error(error)
  }

  setFirstNameMessage(c: AbstractControl): void {
    this.firstNameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.firstNameMessage = Object.keys(c.errors).map(key => this.firstNameValidationMessages[key]).join(' ');
    }
  }

  setLastNameMessage(c: AbstractControl): void {
    this.lastNameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.lastNameMessage = Object.keys(c.errors).map(key => this.lastNameValidationMessages[key]).join(' ');
    }
  }

  setAgeMessage(c: AbstractControl): void {
    this.ageMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.ageMessage = Object.keys(c.errors).map(key => this.ageValidationMessages[key]).join(' ');
    }
  }

  setProfessionMessage(c: AbstractControl): void {
    this.professionMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.professionMessage = Object.keys(c.errors).map(key => this.professionValidationMessages[key]).join(' ');
    }
  }

}
