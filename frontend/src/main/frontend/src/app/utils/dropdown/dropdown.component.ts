import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input()
  values: Array<number>;

  selectedValue: number;

  @Output()
  valueChange = new EventEmitter();

  ngOnInit() {
    this.selectedValue = this.values[0];
    this.valueChange.emit(this.selectedValue);
  }

  onChange(val) {
    this.selectedValue = val;
    this.valueChange.emit(this.selectedValue);
  }



}
