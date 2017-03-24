import {Routes} from "@angular/router";
import {EmployeeComponent} from "./employee/employee.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";
import {ErrorComponent} from "./common/error/error.component";
import {EmployeeRouteActivator} from "./employee-details/employee-route-activator.service";
import {AuthGuard} from "./common/auth.guard";

export const appRoutes:Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard, EmployeeRouteActivator]},
  { path: '404', component: ErrorComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full'}
]
