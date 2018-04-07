import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {Course} from "../../models/course/course.interface";

@IonicPage()
@Component({
  selector: 'page-edit-hours',
  templateUrl: 'edit-hours.html',
})
export class EditHoursPage {
  course: Course;

  constructor(private navParams: NavParams) {
    this.course = this.navParams.get("course");
  }
}
