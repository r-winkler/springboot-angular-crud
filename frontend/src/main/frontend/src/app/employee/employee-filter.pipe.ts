import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
name: 'filterBy'
})
// http://stackoverflow.com/questions/41672578/filter-on-multiple-colums-using-one-pipe-angular-2
export class EmployeeFilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
    return items.filter(item => {
      let notMatchingField = Object.keys(filter)
        .find(key => !((item[key]+"").toLowerCase()).includes((filter[key]+"").toLowerCase()));
      return !notMatchingField; // true if matches all fields
    });
  }
}
