import {Component, Input} from '@angular/core';
import { Course } from '../../models/course/course.interface';
import {OfficeHours} from "../../models/office-hours/office-hours.interface";
import * as moment from "moment";
import * as _ from "lodash"

//TODO Update officehours realtime
@Component({
  selector: 'office-hours-list',
  templateUrl: 'office-hours-list.html'
})
export class OfficeHoursListComponent {

  @Input() officeHoursList: OfficeHours[];
  _: any = _;
  currentOfficeHours: OfficeHours;

  constructor() {
  }

  getCurrentOfficeHours() {
    if (this.officeHoursList[0]) {
      let timeDiff = moment().diff(moment(this.officeHoursList[0].date), 'minutes');
      if (timeDiff >= 0 && timeDiff < this.officeHoursList[0].duration) {
        return this.officeHoursList[0];
      }
    }
    else {
      return null;
    }
  }

  ngOnInit() {
    this.currentOfficeHours = this.getCurrentOfficeHours();
  }
}
