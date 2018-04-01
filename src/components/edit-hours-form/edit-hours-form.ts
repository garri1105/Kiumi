import {Component, Input, Output, ViewChild} from '@angular/core';
import {OfficeHoursDataProvider} from "../../providers/office-hours-data/office-hours-data";
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import {Slides} from "ionic-angular";

/**
 * Generated class for the EditHoursComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html',
})
export class EditHoursComponent {
  @ViewChild(Slides) slides: Slides;
  @Input() courseKey: string;
  @Output() updatedOfficeHoursList: OfficeHours[];

  officeHoursList: OfficeHours[];
  newOfficeHoursList: OfficeHours[] = [];

  constructor(private officeHoursDataProvider: OfficeHoursDataProvider) {
  }

  addOfficeHourSlot() {
    this.newOfficeHoursList.push({} as OfficeHours);
    this.slides.slideTo(0);
  }

  addOfficeHours(officeHours: OfficeHours) {
    this.officeHoursDataProvider.addOfficeHours(this.courseKey, officeHours);
  }

  updateOfficeHours(officeHours: OfficeHours, index: number) {
    this.officeHoursDataProvider.updateOfficeHours(this.courseKey, officeHours, index);
  }

  ngOnInit() {
    this.officeHoursList = this.officeHoursDataProvider.getOfficeHours(this.courseKey);
  }
}
