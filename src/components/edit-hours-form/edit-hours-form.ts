import {Component, Input, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {Slides, ToastController} from "ionic-angular";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";

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

  addNewOfficeHours() {
    let newOfficeHours = this.newOfficeHoursList.pop();
    newOfficeHours.instructors.push(this.profile.key);
    this.myOfficeHours.push(newOfficeHours);
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

  setEndTime(i: number) {
    this.newOfficeHoursList[i].endTime = this.officeHoursList[i].startTime;
    console.log(this.newOfficeHoursList[i].endTime);
  }

  static makeId(length: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
