import {Component, Injectable, Input, Output} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import { Course } from '../../models/course/course.interface';


/**
 * Generated class for the EditHoursComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html'
})
export class EditHoursComponent {
  // @Input() officeHour: OfficeHours;
  @Input() courseKey: string;
  @Output() updatedOfficeHoursList: OfficeHours[];


  text: string;
  officeHoursList: OfficeHours[];
  // officeHour: OfficeHours;
  // officeHoursDataProvider: OfficeHoursDataProvider;

  constructor(private officeHoursDataProvider: OfficeHoursDataProvider) {
    // this.officeHoursList = [];
    // this.officeHoursList = [officeHoursDataProvider.getOfficeHours(this.courseKey)];
    console.log('Hello EditHoursComponent Component');
    this.text = 'Hello World';
  }

  addOfficeHourSlot() {
    // this.officeHoursList.splice(0, 0, officeHour);
    this.officeHoursList.unshift({} as OfficeHours); 
  }

  addOfficeHours(officeHours: OfficeHours) {
    // console.log(this.courseKey);
    // console.log(officeHours);
    this.officeHoursDataProvider.addOfficeHours(this.courseKey, officeHours);
  }

  ngOnInit() {
    this.officeHoursList = this.officeHoursDataProvider.getOfficeHours(this.courseKey);
  }

}
