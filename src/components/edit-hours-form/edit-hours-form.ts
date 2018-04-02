import {Component, Input, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {Slides, ToastController} from "ionic-angular";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";

@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html',
})
export class EditHoursComponent {
  @ViewChild(Slides) slides: Slides;
  @Input() courseKey: string;
  officeHoursList: OfficeHours[] = [];
  newOfficeHoursList: OfficeHours[] = [];
  myOfficeHours: OfficeHours[] = [];

  constructor(private officeHoursDataProvider: OfficeHoursDataProvider,
              private toast: ToastController,
              private globalProfile: GlobalProfileProvider) {
  }

  addOfficeHourSlot() {
    let newOfficeHours = {} as OfficeHours;
    newOfficeHours.instructing = true;
    newOfficeHours.key = EditHoursComponent.makeId(10);
    this.newOfficeHoursList.push(newOfficeHours);
    this.slides.slideTo(0);
  }

  addOfficeHours(officeHours: OfficeHours) {
    this.myOfficeHours.push(this.newOfficeHoursList.splice(0, 1)[0]);
    this.officeHoursDataProvider.addOfficeHours(this.courseKey, officeHours);
    this.toast.create({
      message: 'Saved succesfully',
      duration: 3000
    }).present();
  }

  updateOfficeHours(officeHours: OfficeHours, index: number) {
    this.officeHoursDataProvider.updateOfficeHours(this.courseKey, officeHours, index);
    this.toast.create({
      message: 'Updated succesfully',
      duration: 3000
    }).present();
  }

  ngOnInit() {
    this.officeHoursList = this.officeHoursDataProvider.getOfficeHours(this.courseKey);

    setTimeout(() => {
      for (let i = 1; i < this.officeHoursList.length; i++) {
        if (this.globalProfile.getProfile().instructor.officeHours.indexOf(this.officeHoursList[i].key) > -1) {
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

  static makeId(length: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
