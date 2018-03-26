import {Component, Injectable, Input} from '@angular/core';
import {Course} from "../../models/course/course.interface"
import {Profile} from "../../models/profile/profile.interface";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";

@Component({
  selector: 'office-hour-list',
  templateUrl: 'office-hour-list.html'
})
export class OfficeHourListComponent {

  constructor() {
  }

}
