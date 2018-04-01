import {Component, Input, Output} from '@angular/core';
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
  // @Input() officeHour: OfficeHours;
  @Input() courseKey: string;
  @Output() updatedOfficeHoursList: OfficeHours[];

  officeHoursList: OfficeHours[];

  constructor(private officeHoursDataProvider: OfficeHoursDataProvider) {
  }

  addOfficeHourSlot() {
    this.officeHoursList.push({} as OfficeHours);
  }

  saveOfficeHours(officeHours: OfficeHours) {
    this.officeHoursDataProvider.addOfficeHours(this.courseKey, officeHours);
  }

  ngOnInit() {
    this.officeHoursList = this.officeHoursDataProvider.getOfficeHours(this.courseKey);
    console.log(this.officeHoursList);
  }

}
