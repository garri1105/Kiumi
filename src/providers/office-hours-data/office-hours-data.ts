import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { OfficeHours } from "../../models/office-hours/office-hours.interface";
import { CourseDataProvider } from '../course-data/course-data';
import { Course } from '../../models/course/course.interface';
import {take} from "rxjs/operators";
import {GlobalProfileProvider} from "../global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../profile-data/profile-data";

/*
  Generated class for the OfficeHoursDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class OfficeHoursDataProvider {

  private officeHoursList: OfficeHours[];
  profile: Profile;

  constructor(private db: AngularFireDatabase,
              private courseData: CourseDataProvider,
              private globalProfile: GlobalProfileProvider,
              private profileData: ProfileDataProvider) {
    this.profile = this.globalProfile.getProfile();
  }

  getOfficeHours(courseKey: string) {
    this.officeHoursList = [];
    this.courseData.getCourseByKey(courseKey)
      .valueChanges().pipe(take(1))
      .subscribe((course: Course) => {
        course.officeHours.map(slot => {
          this.officeHoursList.push(slot);
        });
      });

    return this.officeHoursList;
  }

  addOfficeHours(courseKey: string, officeHours: OfficeHours) {
    this.courseData.getCourseByKey(courseKey)
      .valueChanges().pipe(take(1))
      .subscribe((course: Course) => {
      course.officeHours.push(officeHours);
      this.courseData.updateCourse(course);
    });

    this.profile.instructor.officeHours.push(officeHours.key);
    this.profileData.updateProfile(this.profile);
  }

  updateOfficeHours(courseKey: string, officeHours: OfficeHours, index: number) {
    this.courseData.getCourseByKey(courseKey)
      .valueChanges().pipe(take(1))
      .subscribe((course: Course) => {
        course.officeHours[index] = officeHours;
        this.courseData.updateCourse(course);
      });

    this.profile.instructor.officeHours.forEach((val, i) => {
      if (val === officeHours.key) {
        this.profile.instructor.officeHours[i] = officeHours.key;
      }
    });
    this.profileData.updateProfile(this.profile);
  }

  removeOfficeHours(courseKey: string, officeHours: OfficeHours) {
    this.courseData.getCourseByKey(courseKey)
      .valueChanges()
      .subscribe((course: Course) => {
        if(course.officeHours.indexOf(officeHours) != -1) {
          course.officeHours.splice(course.officeHours.indexOf(officeHours), 1);
      }
      this.courseData.updateCourse(course)
    });
  }

  // editOfficeHours(courseKey: string, officeHours: OfficeHours) {
  //   this.courseData.getCourseByKey(courseKey).valueChanges().subscribe((course: Course) =>
  //   {return course.officeHours});
  // }

}
