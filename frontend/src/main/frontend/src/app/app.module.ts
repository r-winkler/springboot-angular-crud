import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import {EmployeeService} from "./employee/employee.service";
import { NavbarComponent } from './navbar/navbar.component';
import {ToastrService} from "./common/toastr.service";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import {LanguageService} from "./common/language/language.service";
//import {EmployeeData} from "./employee/employee-data";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavbarComponent,
    WelcomeComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    //InMemoryWebApiModule.forRoot(EmployeeData),
  ],
  providers: [EmployeeService, ToastrService, LanguageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
