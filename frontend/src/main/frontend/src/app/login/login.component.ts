import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login: string;
  logout: string;

  ngOnInit(): void {
    this.login = "Login";
    this.logout = "Logout";
  }


}
