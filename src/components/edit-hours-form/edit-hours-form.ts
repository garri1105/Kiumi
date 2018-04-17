import {Component, Input, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {Slides, Toast, ToastController} from "ionic-angular";
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
  errorToast: Toast;
  successToast: Toast;

  constructor(private officeHoursData: OfficeHoursDataProvider,
              private toast: ToastController,
              private profileData: ProfileDataProvider) {

    this.profile = this.profileData.getProfile();
    this.errorToast = this.toast.create({duration: 3000});
    this.successToast = this.toast.create({duration: 1000});
  }

  addOfficeHourSlot() {
    this.newOfficeHours = {
      instructing: true,
      instructors: ['0'],
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
      else if (diff < 60) {
        officeHours.error = 'Office hours must last at least one hour';
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
      .catch(e => this.errorToast.setMessage(e).present());

    this.officeHoursData
      .addOfficeHours(this.newOfficeHours)
      .then(() => {
        this.newOfficeHours = null;
        this.successToast.setMessage('Added successfully').present();
      })
  }

  updateOfficeHours(officeHours: OfficeHours) {
    let message = '';

    if (officeHours.instructors.indexOf(this.profile.key) < 0) {
      officeHours.instructors.push(this.profile.key);
      this.profile.instructor.officeHours.push(officeHours.key);
      this.profileData.updateProfile(this.profile)
        .then(() => message = 'Added and')
        .catch(e => this.errorToast.setMessage(e).present());
    }

    this.officeHoursData
      .updateOfficeHours(officeHours)
      .then(r => {
        this.successToast.setMessage(`${message} Updated successfully`).present();
      })
      .catch(e => this.errorToast.setMessage(e).present());
  }

  removeOfficeHours(officeHours) {
    this.officeHoursList.splice(this.officeHoursList.indexOf(officeHours), 1);
    this.profile.instructor.officeHours.splice(this.profile.instructor.officeHours.indexOf(officeHours.key), 1);
    this.profileData.updateProfile(this.profile)
      .catch(e => this.errorToast.setMessage(e).present());

    this.officeHoursData
      .removeOfficeHours(officeHours)
      .then(r => {
        this.successToast.setMessage(`Removed successfully`).present();
        if (this.slides) {
          this.slides.slidePrev();
          this.slides.slideNext();
        }
      })
      .catch(e => this.errorToast.setMessage(e).present());
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
