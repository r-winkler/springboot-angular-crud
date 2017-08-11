import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  languages = [
    { code: 'en', label: 'English'},
    { code: 'es', label: 'Español'},
    { code: 'de', label: 'Deutsch'}
  ];

  constructor(@Inject(LOCALE_ID) protected localeId: string) {}

  ngOnInit() {

  }

  changeLanguage(language: String): void {
    console.log(language);
}

}
