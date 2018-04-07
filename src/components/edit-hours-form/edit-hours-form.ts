import {Component, Input, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {Slides, ToastController} from "ionic-angular";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";
import * as moment from "moment";

@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html',
})
export class EditHoursComponent {
  @ViewChild(Slides) slides: Slides;
  @Input() courseKey: string;
  profile: Profile;
  officeHoursList: OfficeHours[] = [];
  newOfficeHoursList: OfficeHours[] = [];
  myOfficeHours: OfficeHours[] = [];
  now = moment();
  timesInvalid: string;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private officeHoursDataProvider: OfficeHoursDataProvider,
              private toast: ToastController,
              private globalProfile: GlobalProfileProvider) {
    this.profile = this.globalProfile.getProfile();
  }

  addOfficeHourSlot() {
    let newOfficeHours = {} as OfficeHours;
    newOfficeHours.instructing = true;
    newOfficeHours.instructors = ['0'];
    newOfficeHours.studentQueue = ['0'];
    newOfficeHours.key = EditHoursComponent.makeId(10);
    this.newOfficeHoursList.push(newOfficeHours);
    this.slides.slideTo(0);
  }

  static getDayDistance(a: number, b: number) {
    return ((b - a) + 7) % 7;
  }

  fillEndTime(i: number) {
    this.newOfficeHoursList[i].endTime =
      moment(this.newOfficeHoursList[i].startTime, 'HH:mm')
      .add(1, 'hours')
      .format('HH:mm');
  }

  areTimesInvalid(i) {
    let start = moment()
      .hours(parseInt(this.newOfficeHoursList[i].startTime.slice(0, 2)))
      .minutes(parseInt(this.newOfficeHoursList[i].startTime.slice(3, )));

    let end = moment()
      .hours(parseInt(this.newOfficeHoursList[i].endTime.slice(0, 2)))
      .minutes(parseInt(this.newOfficeHoursList[i].endTime.slice(3, )));

    let diff = end.diff(start, 'minutes', true);

    if (this.newOfficeHoursList[i].startTime === this.newOfficeHoursList[i].endTime) {
      this.timesInvalid = 'Times can\'t be the same';
    }
    else if (diff < 0) {
      this.timesInvalid = 'End time must be after start time';
    }
    else if (diff < 60) {
      this.timesInvalid = 'Office hours must last at least one hour';
    }
    else {
      this.timesInvalid = null;
      this.newOfficeHoursList[i].duration = diff;
    }
  }

  addNewOfficeHours() {
    let newOfficeHours = this.newOfficeHoursList.pop();
    newOfficeHours.instructors.push(this.profile.key);
    this.myOfficeHours.push(newOfficeHours);

    let dist = EditHoursComponent.getDayDistance(this.now.day(), moment().day(`${newOfficeHours.dayOfWeek}`).day());

    let newDate = moment().add(dist+1, 'days')
      .hours(parseInt(newOfficeHours.startTime.slice(0, 2)))
      .minutes(parseInt(newOfficeHours.startTime.slice(3, )));

    if (dist === 0 && newDate.diff(this.now) < 0) {
      newDate.add(7, 'days')
    }

    newOfficeHours.date = newDate.format('LLLL');

    this.officeHoursDataProvider.addOfficeHours(this.courseKey, newOfficeHours);
    this.toast.create({
      message: 'Saved succesfully',
      duration: 1000
    }).present();
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

    this.officeHoursList = this.officeHoursDataProvider.getOfficeHours(this.courseKey);

    setTimeout(() => {
      for (let i = 1; i < this.officeHoursList.length; i++) {
        let time = moment(this.officeHoursList[i].date);
        this.officeHoursList[i].dayOfWeek = time.format('dddd');
        this.officeHoursList[i].startTime = `${EditHoursComponent.pad(time.hours(), 2)}:${EditHoursComponent.pad(time.minutes(), 2)}`;
        time.add(this.officeHoursList[i].duration, 'minutes');
        this.officeHoursList[i].endTime = `${EditHoursComponent.pad(time.hours(), 2)}:${EditHoursComponent.pad(time.minutes(), 2)}`;

        if (this.profile.instructor.officeHours.indexOf(this.officeHoursList[i].key) > -1) {
          let myOfficeHours = this.officeHoursList.splice(i, 1, null);
          myOfficeHours[0].instructing = true;
          this.myOfficeHours.push(myOfficeHours[0]);
        }
        else {
          this.officeHoursList[i].instructing = false;
        }
      }
    }, 1);
  }

  static pad(num, size) {
    var s = String(num);
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
