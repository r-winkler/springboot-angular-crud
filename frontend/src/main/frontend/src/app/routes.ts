import {Routes} from "@angular/router";
import {EmployeeComponent} from "./employee/employee.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";

export const appRoutes:Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'employee/:id', component: EmployeeDetailsComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full'}
]
