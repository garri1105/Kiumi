import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import { Course } from '../../models/course/course.interface';
import * as moment from "moment";
import {OfficeHours} from "../../models/office-hours/office-hours.interface";
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import {UtilitiesProvider} from "../../providers/utilities/utilities";

@IonicPage()
@Component({
  selector: 'page-class-queue',
  templateUrl: 'class-queue.html'
})
export class ClassQueuePage {
  course: Course;
  officeHoursList: OfficeHours[];
  ready: boolean;

  constructor(private navParams: NavParams,
              private officeHoursData: OfficeHoursDataProvider)  {
      this.course = this.navParams.get('course');
  }

  async getOfficeHours() {
    this.officeHoursList = await this.officeHoursData.getOfficeHours(this.course.key);

      for (let i = 0; i < this.officeHoursList.length; i++) {
      let time = moment(this.officeHoursList[i].date);
      this.officeHoursList[i].dayOfWeek = time.format('dddd');
      this.officeHoursList[i].startTime = `${UtilitiesProvider.pad(time.hours(), 2)}:${UtilitiesProvider.pad(time.minutes(), 2)}`;
      time.add(this.officeHoursList[i].duration, 'minutes');
      this.officeHoursList[i].endTime = `${UtilitiesProvider.pad(time.hours(), 2)}:${UtilitiesProvider.pad(time.minutes(), 2)}`;

      if (moment().diff(time) > 0) {
        time.add(7, 'days');
        this.officeHoursList[i].date = time.format('ddd, DD MMM YYYY, HH:mm');
        this.officeHoursData.updateOfficeHours(this.course.key, this.officeHoursList[i]);
        this.officeHoursList.push(this.officeHoursList.splice(i, 1)[0]);
      }
      else {

      }
    }
  }

  ionViewWillEnter() {
    this.getOfficeHours().then(() => this.ready = true);
  }
}
