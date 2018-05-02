import {Component, Input, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {AlertController, Slides, ToastController} from "ionic-angular";
import {Profile} from "../../models/profile/profile.interface";
import * as moment from "moment";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {Course} from "../../models/course/course.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";

@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html',
})
export class EditHoursFormComponent {
  @ViewChild(Slides) slides: Slides;
  @Input() course: Course;
  @Input() officeHoursList: OfficeHours[] = [];
  profile: Profile;
  newOfficeHours: OfficeHours;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private officeHoursData: OfficeHoursDataProvider,
              private toast: ToastController,
              private alert: AlertController,
              private profileData: ProfileDataProvider) {

    this.profile = this.profileData.getProfile();
  }

  displaySuccessToast(message: string) {
    this.toast.create({
      message: message,
      duration: 1000
    }).present();
  }

  displayErrorToast(message: string) {
    this.toast.create({
      message: message,
      duration: 3000
    }).present();
  }

  // This function creates an office hour, allowing an instructor to enter in details for the office hour. It is 
  // displayed as the first tab in the list of office hours. 
  addOfficeHourSlot() {
    this.newOfficeHours = {
      instructing: true,
      instructors: ['0'],
      instructorsO: [this.profile],
      studentQueue: ['0'],
      key: UtilitiesProvider.makeId(10)
    } as OfficeHours;

    this.slides.slideTo(0);
  }

  // This function automatically fills in the end time by adding one hour to the start time. It takes in an OfficeHours 
  // parameter and then fills in the end time. 
  fillEndTime(officeHours: OfficeHours) {
    if (officeHours.startTime) {
      officeHours.endTime =
        moment(officeHours.startTime, 'HH:mm')
          .add(1, 'hours')
          .format('HH:mm');
    }
  }

  // This function validates office hours. It takes an OfficeHours parameter and makes sure that the start and end time
  // aren't the same, the start time isn't after the end time, and that the office hours last at least 30 minutes. 
  isValid(officeHours: OfficeHours) {
    if (officeHours.startTime && officeHours.endTime) {
      let start = moment(officeHours.startTime, 'HH:mm');
      let end = moment(officeHours.endTime, 'HH:mm');

      let diff = end.diff(start, 'minutes', true);

      if (diff === 0) {
        officeHours.error = 'Times can\'t be the same';
      }
      else if (diff < 0) {
        officeHours.error = 'End time must be after start time';
      }
      else if (diff < 30) {
        officeHours.error = 'Office hours must be at least 30 minutes';
      }
      else {
        officeHours.error = null;
        officeHours.duration = diff;
      }
    }
  }

  // This function adds a new office hours by pushing an instructor of an office hour onto the instructors list for a 
  // given office hour and then pushing this office hour onto a list of the course's office hours. 
  addNewOfficeHours() {
    this.newOfficeHours.instructors.push(this.profile.key);
    this.officeHoursList.push(this.newOfficeHours);
    this.profile.instructor.officeHours.push(this.newOfficeHours.key);
    this.profileData.updateProfile(this.profile)
      .catch(e => this.displayErrorToast(e));

    this.officeHoursData
      .addOfficeHours(this.newOfficeHours)
      .then(() => {
        this.newOfficeHours = null;
        this.displaySuccessToast('Added successfully');
      })
  }

  // This function takes in an OfficeHours parameter and allows an instructor to update an office hours by adjusting
  // or adding details. They can change their role as an instructor, the location, the day, and the start and end times. 
  updateOfficeHours(officeHours: OfficeHours) {
    let message = '';

    let instructorIndex = officeHours.instructors.indexOf(this.profile.key);

    if (officeHours.instructing && instructorIndex === -1) {
      officeHours.instructors.push(this.profile.key);
      this.profile.instructor.officeHours.push(officeHours.key);
      this.profileData.updateProfile(this.profile)
        .then(() => message = 'Added and')
        .catch(e => this.displayErrorToast(e));
    }
    else if (!officeHours.instructing && instructorIndex > -1) {
      officeHours.instructors.splice(instructorIndex, 1);
      this.profile.instructor.officeHours.splice(this.profile.instructor.officeHours.indexOf(officeHours.key), 1);
      console.log(this.profile);
      this.profileData.updateProfile(this.profile)
        .then(() => message = 'Removed and')
        .catch(e => this.displayErrorToast(e));
    }

    this.officeHoursData
      .updateOfficeHours(officeHours)
      .then(r => {
        this.displaySuccessToast(`${message} Updated successfully`);
      })
      .catch(e => this.displayErrorToast(e));
  }

  // This function removes an OfficeHours instance. It takes in an OfficeHours parameter and then uses the 
  // OfficeHoursDataProvider to remove this OfficeHours instance from the list of office hours for a course. 
  removeOfficeHours(officeHours: OfficeHours) {
    if (officeHours.instructors.length <= 2) {
      this.officeHoursList.splice(this.officeHoursList.indexOf(officeHours), 1);
      this.profile.instructor.officeHours.splice(this.profile.instructor.officeHours.indexOf(officeHours.key), 1);
      this.profileData.updateProfile(this.profile)
        .catch(e => this.displayErrorToast(e));

      this.officeHoursData
        .removeOfficeHours(officeHours)
        .then(r => {
          this.displaySuccessToast(`Removed successfully`);
          if (this.slides) {
            this.slides.slidePrev();
            this.slides.slideNext();
          }
        })
        .catch(e => this.displayErrorToast(e));
    }
    else {
      this.alert.create({
        title: 'Wait!',
        message: 'You can\'t delete office hours with other instructors in them!'
      }).present()
    }
  }

  // This function allows an instructor to toggle whether or not they're instructing a given office hour. 
  // It takes an OfficeHours parameter and then updates this parameter to display whether or not the user is 
  // the instructing this office hour. 
  toggleInstructing(officeHours: OfficeHours) {
    if (officeHours.instructing) {
      officeHours.instructorsO.push(this.profile);
    }
    else {
      for (let i = 0; officeHours.instructorsO.length; i++) {
        if (officeHours.instructorsO[i].key === this.profile.key) {
          officeHours.instructorsO.splice(i, 1);
          break;
        }
      }
    }
  }

  ngOnInit() {
    if (this.officeHoursList.length > 1) {
      this.officeHoursList.sort((a, b) => {
        let indexA = this.profile.instructor.officeHours.indexOf(a.key);
        let indexB = this.profile.instructor.officeHours.indexOf(b.key);
        return indexB - indexA;
      });
    }
  }

}
