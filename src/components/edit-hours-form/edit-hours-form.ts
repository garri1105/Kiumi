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

  fillEndTime(officeHours: OfficeHours) {
    if (officeHours.startTime) {
      officeHours.endTime =
        moment(officeHours.startTime, 'HH:mm')
          .add(1, 'hours')
          .format('HH:mm');
    }
  }

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
