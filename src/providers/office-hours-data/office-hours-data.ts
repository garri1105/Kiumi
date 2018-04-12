import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { OfficeHours } from "../../models/office-hours/office-hours.interface";
import { CourseDataProvider } from '../course-data/course-data';
import { Course } from '../../models/course/course.interface';
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../profile-data/profile-data";
import * as moment from "moment";
import {UtilitiesProvider} from "../utilities/utilities";
import {take} from "rxjs/operators";

@Injectable()
export class OfficeHoursDataProvider {

  private officeHoursList: OfficeHours[];
  officeHoursList$: AngularFireList<OfficeHours>;
  profile: Profile;
  officeHours: AngularFireObject<OfficeHours>;

  constructor(private db: AngularFireDatabase,
              private courseData: CourseDataProvider,
              private profileData: ProfileDataProvider) {

    this.profile = this.profileData.getProfile();
  }

  getOfficeHoursByKey(courseKey, officeHoursIndex) {
    this.officeHours = this.db.object(`course-list/${courseKey}/officeHours/${officeHoursIndex}`);
    return this.officeHours.valueChanges().pipe(take(1));
  }

  getOfficeHoursListRef(courseKey: string) {
    this.officeHoursList$ = this.db.list(`course-list/${courseKey}/officeHours`);
    return this.officeHoursList$;
  }

  addOfficeHours(officeHours: OfficeHours) {
    let cleanOfficeHours = this.cleanOfficeHours(officeHours);
    return this.officeHoursList$.set(cleanOfficeHours.key, cleanOfficeHours);
  }

  updateOfficeHours(officeHours: OfficeHours) {
    let cleanOfficeHours = this.cleanOfficeHours(officeHours);
    return this.officeHoursList$.update(cleanOfficeHours.key, cleanOfficeHours);
  }

  removeOfficeHours(officeHours: OfficeHours) {
    return this.officeHoursList$.remove(officeHours.key);
  }

  cleanOfficeHours(original: OfficeHours) {
    let officeHours: OfficeHours = JSON.parse(JSON.stringify(original));

    let dist = UtilitiesProvider.getDayDistance(moment().isoWeekday(), moment().isoWeekday(officeHours.dayOfWeek.trim()).isoWeekday());

    let newDate = moment(officeHours.startTime, 'HH:mm');
    newDate = moment().add(dist, 'days')
      .hours(newDate.hours())
      .minutes(newDate.minutes());

    if (dist === 0 && newDate.diff(moment()) < 0) {
      newDate.add(7, 'days')
    }

    officeHours.date = newDate.format('ddd, DD MMM YYYY, HH:mm');

    officeHours.instructing = null;
    officeHours.dayOfWeek = null;
    officeHours.startTime = null;
    officeHours.endTime = null;

    return officeHours;
  }
}
