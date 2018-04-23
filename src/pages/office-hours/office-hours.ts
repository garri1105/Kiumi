import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import { Course } from '../../models/course/course.interface';
import * as moment from "moment";
import {OfficeHours} from "../../models/office-hours/office-hours.interface";
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Subscription} from "rxjs/Subscription";
import {take} from "rxjs/operators";

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
  }

  ionViewWillEnter() {
    console.log('Entering office-hours page');

    this.officeHoursList$ = this.officeHoursData.getOfficeHoursListRef(this.course.key)
      .valueChanges().subscribe(officeHoursList => {
        this.initOfficeHours(officeHoursList);
      });

    this.isInstructor();
  }

  ionViewWillLeave() {
    console.log('Leaving office-hours page');

    this.officeHoursList$.unsubscribe();
  }

  // The initOfficeHours function takes in an array of OfficeHours and initializes the list to make sure that 
  // the upcoming office hours will be accurately displayed.  
  initOfficeHours(officeHoursList: OfficeHours[]) {
    for (let i = 1; i < officeHoursList.length; i++) {
      let time = moment(officeHoursList[i].date);
      officeHoursList[i].dayOfWeek = time.format('dddd');
      officeHoursList[i].startTime = `${UtilitiesProvider.pad(time.hours(), 2)}:${UtilitiesProvider.pad(time.minutes(), 2)}`;
      time.add(officeHoursList[i].duration, 'minutes');
      officeHoursList[i].endTime = `${UtilitiesProvider.pad(time.hours(), 2)}:${UtilitiesProvider.pad(time.minutes(), 2)}`;

      if (moment().diff(time) > 0) {
        time.add(7, 'days');
        officeHoursList[i].date = time.format('ddd, DD MMM YYYY, HH:mm');
        officeHoursList[i].studentQueue = ['0'];
        this.officeHoursData.updateOfficeHours(officeHoursList[i]);
        officeHoursList.push(officeHoursList.splice(i, 1)[0]);
      }

      this.getInstructors(officeHoursList[i]);

      if (this.profile.instructor) {
        if (this.profile.instructor.officeHours.indexOf(officeHoursList[i].key) > -1) {
          officeHoursList[i].instructing = true;
        }
      }
    }

    officeHoursList.splice(0, 1);
    UtilitiesProvider.sortByDate(officeHoursList);

    this.officeHoursList = officeHoursList;
  }

  // This isInstructor function takes in no parameters and sets the boolean variable isInstructing to true 
  // if the user is an instructor of the course. 
  isInstructor() {
    if (this.profile.instructor) {
      this.profile.instructor.courses.forEach(courseKey => {
        if (courseKey === this.course.key) {
          this.isInstructing = true;
        }
      });
    }
  }

  // This getInstructors function takes in an OfficeHours appointment as an input and pushes the instructor onto 
  // the list of instructors for that individual OfficeHours appointment. 
  getInstructors(officeHours: OfficeHours) {
    officeHours.instructorsO = [];
    officeHours.instructors.forEach(instructorId => {
      console.log(instructorId);
      this.profileData.getProfileById(instructorId)
        .pipe(take(1)).subscribe((instructor: Profile) => {
          console.log(instructor);
          if (instructor) {
            officeHours.instructorsO.push(instructor);
          }
      });
    });
  }
}
