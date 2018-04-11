import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { OfficeHours } from "../../models/office-hours/office-hours.interface";
import { CourseDataProvider } from '../course-data/course-data';
import { Course } from '../../models/course/course.interface';
import {GlobalProfileProvider} from "../global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../profile-data/profile-data";
import * as moment from "moment";
import {UtilitiesProvider} from "../utilities/utilities";
import {take} from "rxjs/operators";

//TODO: Refactor this page
@Injectable()
export class OfficeHoursDataProvider {

  private officeHoursList: OfficeHours[];
  profile: Profile;
  officeHours: AngularFireObject<OfficeHours>;

  constructor(private db: AngularFireDatabase,
              private courseData: CourseDataProvider,
              private globalProfile: GlobalProfileProvider,
              private profileData: ProfileDataProvider) {
    this.profile = this.globalProfile.getProfile();
  }

  getOfficeHoursByKey(courseKey, officeHoursIndex) {
    this.officeHours = this.db.object(`course-list/${courseKey}/officeHours/${officeHoursIndex}`);
    return this.officeHours.valueChanges().pipe(take(1));
  }

  async getOfficeHours(courseKey: string): Promise<OfficeHours[]> {
    return new Promise<OfficeHours[]>((resolve) => {
      this.courseData.getCourseByKey(courseKey)
        .subscribe((course: Course) => {
          this.officeHoursList = [];
          course.officeHours.map(slot => {
            if (slot.key !== '0') {
              this.officeHoursList.push(slot);
            }
          });
          resolve(this.officeHoursList);
        })
    });
  }

  addOfficeHours(courseKey: string, officeHours: OfficeHours) {
    return new Promise((resolve, reject) => {
      this.courseData.getCourseByKey(courseKey)
        .subscribe((course: Course) => {
          course.officeHours.push(this.cleanOfficeHours(officeHours));
          UtilitiesProvider.sortByDate(course.officeHours);
          this.courseData.updateCourse(course).catch(e => reject(`Update course error: ${e}`));
        });

      this.profile.instructor.officeHours.push(officeHours.key);
      this.profileData.updateProfile(this.profile)
        .then(r => resolve('Added succesfully'))
        .catch(e => reject(`Update profile error: ${e}`));
    });
  }

  updateOfficeHours(courseKey: string, officeHours: OfficeHours) {
    return new Promise((resolve, reject) => {
      this.courseData.getCourseByKey(courseKey)
        .subscribe((course: Course) => {
          console.log(course.officeHours.length);
          for (let i = 0; i < course.officeHours.length; i++) {
            if (course.officeHours[i].key === officeHours.key) {
              if (officeHours.instructors.indexOf(this.profile.key) > -1) {

                course.officeHours[i] = this.cleanOfficeHours(officeHours);
                UtilitiesProvider.sortByDate(course.officeHours);
                try {
                  this.courseData.updateCourse(course);
                  resolve('Updated succesfully');
                }
                catch(e) {
                  reject(`Update course error: ${e}`);
                }
              }
              else {
                officeHours.instructors.push(this.profile.key);
                this.profile.instructor.officeHours.push(officeHours.key);
                this.profileData.updateProfile(this.profile)
                  .then(r => {
                    resolve('Added to your office hours');
                  })
                  .catch(e => {
                    reject(`Update profile error: ${e}`);
                  });
              }
            }
          }
          reject('Couldn\'t update office hours');
        });
      });
  }

  removeOfficeHours(courseKey: string, officeHours: OfficeHours) {
    return new Promise((resolve, reject) => {
      this.courseData.getCourseByKey(courseKey)
        .subscribe((course: Course) => {
          if(course.officeHours.indexOf(officeHours) !== -1) {
            course.officeHours.splice(course.officeHours.indexOf(officeHours), 1);
          }
          this.courseData.updateCourse(course).catch(e => reject(`Update course error: ${e}`));
        });

      this.profile.instructor.officeHours.splice(this.profile.instructor.officeHours.indexOf(officeHours.key));
      this.profileData.updateProfile(this.profile)
        .then(r => resolve('Removed succesfully'))
        .catch(e => reject(`Update profile error: ${e}`));
    });
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
