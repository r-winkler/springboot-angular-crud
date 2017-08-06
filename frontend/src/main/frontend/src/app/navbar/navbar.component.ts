import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  languages : string[] = ['English','Spanish','German'];

  constructor() { }

  ngOnInit() {

  }

  changeLanguage(language: String): void {
    console.log(language);
}

}
