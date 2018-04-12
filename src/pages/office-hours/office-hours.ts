import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import { Course } from '../../models/course/course.interface';
import * as moment from "moment";
import {OfficeHours} from "../../models/office-hours/office-hours.interface";
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {take} from "rxjs/operators";
import {Subscription} from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-office-hours',
  templateUrl: 'office-hours.html'
})
export class OfficeHoursPage {
  course: Course;
  officeHoursList: OfficeHours[];
  officeHoursList$: Subscription;
  isInstructing: boolean;
  profile: Profile;

  constructor(private navParams: NavParams,
              private officeHoursData: OfficeHoursDataProvider,
              private profileData: ProfileDataProvider)  {

    this.profile = this.profileData.getProfile();
    this.course = this.navParams.get('course');
    this.initOfficeHours();
    this.isInstructor();
  }

  initOfficeHours() {
    this.officeHoursList$ = this.officeHoursData.getOfficeHoursListRef(this.course.key)
      .valueChanges().subscribe(officeHoursList => {
        for (let i = 1; i < officeHoursList.length; i++) {
          let time = moment(officeHoursList[i].date);
          officeHoursList[i].dayOfWeek = time.format('dddd');
          officeHoursList[i].startTime = `${UtilitiesProvider.pad(time.hours(), 2)}:${UtilitiesProvider.pad(time.minutes(), 2)}`;
          time.add(officeHoursList[i].duration, 'minutes');
          officeHoursList[i].endTime = `${UtilitiesProvider.pad(time.hours(), 2)}:${UtilitiesProvider.pad(time.minutes(), 2)}`;

          if (moment().diff(time) > 0) {
            time.add(7, 'days');
            officeHoursList[i].date = time.format('ddd, DD MMM YYYY, HH:mm');
            this.officeHoursData.updateOfficeHours(officeHoursList[i]);
            officeHoursList.push(officeHoursList.splice(i, 1)[0]);
          }

          if (this.profile.instructor) {
            if (this.profile.instructor.officeHours.indexOf(officeHoursList[i].key) > -1) {
              officeHoursList[i].instructing = true;
            }
          }
        }

        officeHoursList.splice(0, 1);
        UtilitiesProvider.sortByDate(officeHoursList);

        this.officeHoursList = officeHoursList;
      });
  }

  isInstructor() {
    this.profile.instructor.courses.forEach(courseKey => {
      if (courseKey === this.course.key) {
        this.isInstructing = true;
      }
    });
  }

  ionViewWillUnload() {
    this.officeHoursList$.unsubscribe();
  }
}
