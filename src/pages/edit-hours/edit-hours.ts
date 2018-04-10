import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {Course} from "../../models/course/course.interface";
import {OfficeHours} from "../../models/office-hours/office-hours.interface";

@IonicPage()
@Component({
  selector: 'page-edit-hours',
  templateUrl: 'edit-hours.html',
})
export class EditHoursPage {
  course: Course;
  officeHoursList: OfficeHours[];
  ready: boolean;

  constructor(private navParams: NavParams) {
    this.initNavParams();
  }

  async initNavParams() {
    this.course = this.navParams.get("course");
    let promise = new Promise<OfficeHours[]>((resolve) => {
      resolve(this.navParams.get("officeHoursList"))
    });
    this.officeHoursList = await promise;
    this.ready = true;
  }
}
