# Ng2boot

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.31.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# I18n

See https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358
See https://github.com/angular/angular-cli/wiki/stories-internationalization

1. ng xi18n --output-path src/locale --> generates messages.xlf
2. Create and translate messages.xx.xlf manually
3. npm run build

In development, Angular can started bundled with only one specific language as follows :

ng serve --aot --locale es --i18n-format xlf --i18n-file src/locale/messages.es.xlf
