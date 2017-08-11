import {Component, Inject, LOCALE_ID} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  languages: Map<string, string> = new Map([['English', 'en'], ['Español', 'es'], ['Deutsch', 'de']]);

  selectedLanguage: string = 'English';

  constructor(@Inject(LOCALE_ID) protected localeId: string) {
  }

  changeLanguage(language: string): void {
    if (this.selectedLanguage != language) {
      this.selectedLanguage = language;
      window.location.href = window.location.host + "/" + this.languages.get(language);
    }
  }

}
