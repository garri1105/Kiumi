import {Component, Input, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {Slides, ToastController} from "ionic-angular";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";
import * as moment from "moment";
import {UtilitiesProvider} from "../../providers/utilities/utilities";

//TODO: Refactor this page
@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html',
})
export class EditHoursFormComponent {
  @ViewChild(Slides) slides: Slides;
  @Input() courseKey: string;
  @Input() officeHoursList: OfficeHours[] = [];
  profile: Profile;
  newOfficeHours: OfficeHours;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private officeHoursData: OfficeHoursDataProvider,
              private toast: ToastController,
              private globalProfile: GlobalProfileProvider) {
    this.profile = this.globalProfile.getProfile();
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

    this.officeHoursData
      .addOfficeHours(this.courseKey, this.newOfficeHours)
      .then(r => {
        this.newOfficeHours = null;
        this.toast.create({
          message: `Saved succesfully`,
          duration: 1000
        }).present();
      })
      .catch(e => {
        this.toast.create({
          message: `Failed to save`,
          duration: 3000
        }).present();
    });

  }

  updateOfficeHours(officeHours: OfficeHours) {
    this.officeHoursData
      .updateOfficeHours(this.courseKey, officeHours)
      .then((r: string) => {
      this.toast.create({
        message: r,
        duration: 1000
      }).present();})
      .catch(e => {
      this.toast.create({
        message: e,
        duration: 3000
      }).present();
    });
  }

  ngOnInit() {
    if (this.officeHoursList.length === 1) {
      if (this.profile.instructor.officeHours.indexOf(this.officeHoursList[0].key) > -1) {
        this.officeHoursList[0].instructing = true;
      }
    }
    else {
      this.officeHoursList.sort((a, b) => {
        let indexA = this.profile.instructor.officeHours.indexOf(a.key);
        let indexB = this.profile.instructor.officeHours.indexOf(b.key);

        if (indexA > -1) {
          a.instructing = true;
        }

        if (indexB > -1) {
          b.instructing = true;
        }

        return indexB - indexA;
      });
    }
  }
}
