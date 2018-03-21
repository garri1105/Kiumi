import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { OfficeHours } from "../../models/office-hours/office-hours.interface";

/*
  Generated class for the OfficeHoursDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class OfficeHoursDataProvider {

  private officeHoursList = this.db.list<OfficeHours>('edit-hours-form');

  constructor(private db: AngularFireDatabase) {
    console.log('Hello OfficeHoursDataProvider Provider');
  }

  getOfficeHours() {
    return this.officeHoursList;
  }

  addOfficeHours(officeHours: OfficeHours) {
    this.officeHoursList.push(officeHours);
  }

  removeOfficeHours(officeHours: OfficeHours) {
    this.officeHoursList.remove(officeHours.key);
  }

  editOfficeHours(officeHours: OfficeHours) {
    this.officeHoursList.update(officeHours.key, officeHours);
  }

}
