import {Component, Injectable, Input, Output} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';


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
  @Input() officeHour: OfficeHours;
  @Output() updatedOfficeHoursList: OfficeHours[];


  text: string;
  officeHoursList: OfficeHours[];

  constructor() {
    this.officeHoursList = [this.officeHour];
    console.log('Hello EditHoursComponent Component');
    this.text = 'Hello World';
  }

  addOfficeHour(officeHour: OfficeHours) {
    if (!this.officeHour){
      this.officeHour = {} as OfficeHours;
    }
    // this.officeHoursList.splice(0, 0, officeHour);
    this.officeHoursList.push(officeHour);
  }

}
