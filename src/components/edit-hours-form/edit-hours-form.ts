import {Component, Input, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {Slides, ToastController} from "ionic-angular";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";
import * as moment from "moment";
import {makeDecorator} from "@angular/core/src/util/decorators";

//TODO: Refactor this page
@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html',
})
export class EditHoursComponent {
  @ViewChild(Slides) slides: Slides;
  @Input() courseKey: string;
  @Input() officeHoursList: OfficeHours[] = [];
  profile: Profile;
  newOfficeHours: OfficeHours;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private officeHoursDataProvider: OfficeHoursDataProvider,
              private toast: ToastController,
              private globalProfile: GlobalProfileProvider) {
    this.profile = this.globalProfile.getProfile();
  }

  addOfficeHourSlot() {
    this.newOfficeHours = {
      instructing: true,
      instructors: ['0'],
      studentQueue: ['0'],
      key: EditHoursComponent.makeId(10)
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
    let newOfficeHours: OfficeHours = JSON.parse(JSON.stringify(this.newOfficeHours));

    console.log(newOfficeHours);

    newOfficeHours.instructors.push(this.profile.key);

    let dist = EditHoursComponent.getDayDistance(moment().isoWeekday(), moment().isoWeekday(newOfficeHours.dayOfWeek.trim()).isoWeekday());

    let newDate = moment(newOfficeHours.startTime, 'HH:mm');
    newDate = moment().add(dist, 'days')
      .hours(newDate.hours())
      .minutes(newDate.minutes());

    if (dist === 0 && newDate.diff(moment()) < 0) {
      newDate.add(7, 'days')
    }

    newOfficeHours.date = newDate.format('ddd, DD MMM YYYY, HH:mm');

    newOfficeHours.instructing = null;
    newOfficeHours.dayOfWeek = null;
    newOfficeHours.startTime = null;
    newOfficeHours.endTime = null;

    this.officeHoursList.push(newOfficeHours);

    this.officeHoursDataProvider
      .addOfficeHours(this.courseKey, newOfficeHours)
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
    this.officeHoursDataProvider.updateOfficeHours(this.courseKey, officeHours)
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
    this.officeHoursList.sort((a, b) => {
      if (this.profile.instructor.officeHours.indexOf(b.key) > -1) {
        b.instructing = true;
      }
      if (this.profile.instructor.officeHours.indexOf(a.key) > -1) {
        a.instructing = true;
      }

      return this.profile.instructor.officeHours.indexOf(b.key) - this.profile.instructor.officeHours.indexOf(a.key);
    });
  }

  static getDayDistance(a: number, b: number) {
    return ((b - a) + 7) % 7;
  }

  static pad(num, size) {
    let s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  static makeId(length: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
