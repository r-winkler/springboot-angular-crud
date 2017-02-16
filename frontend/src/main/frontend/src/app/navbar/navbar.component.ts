import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  welcome: string;
  employees: string;
  login: string;

  constructor() { }

  ngOnInit() {
    this.welcome = "Welcome";
    this.employees = "Employees";
    this.login = "Login";
  }

}
