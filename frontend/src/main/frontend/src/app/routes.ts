import {Routes} from "@angular/router";
import {EmployeeComponent} from "./employee/employee.component";

export const appRoutes:Routes = [
  { path: 'employee', component: EmployeeComponent},
  //{ path: 'employee/:id', component: EmployeeDetailsComponent},
  { path: '', redirectTo: '/employee', pathMatch: 'full'}
]
