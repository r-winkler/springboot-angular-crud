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
import { ErrorComponent } from './common/error/error.component';
import {EmployeeRouteActivator} from "./employee-details/employee-route-activator.service";
import {EmployeeFilterPipe} from "./employee/employee-filter.pipe";
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./common/auth.guard";
import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';
//import {EmployeeData} from "./employee/employee-data";
import {NgxPaginationModule} from 'ngx-pagination';
import { DropdownComponent } from './utils/dropdown/dropdown.component'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavbarComponent,
    WelcomeComponent,
    EmployeeDetailsComponent,
    ErrorComponent,
    EmployeeFilterPipe,
    LoginComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    OAuthModule.forRoot(),
    NgxPaginationModule
    //InMemoryWebApiModule.forRoot(EmployeeData),
  ],
  providers: [EmployeeService, ToastrService, LanguageService, EmployeeRouteActivator, AuthGuard, OAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
