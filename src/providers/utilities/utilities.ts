import { Injectable } from '@angular/core';
import {CourseDataProvider} from "../course-data/course-data";
import {ProfileDataProvider} from "../profile-data/profile-data";
import {Student} from "../../models/student/student.interface";
import {Instructor} from "../../models/instructor/instructor.interface";
import {OfficeHours} from "../../models/office-hours/office-hours.interface";
import {take} from "rxjs/operators";
import * as moment from "moment";

@Injectable()
export class UtilitiesProvider {

  constructor(private courseData: CourseDataProvider,
              private profileData: ProfileDataProvider) {

  }

  static sortByDate(officeHours: OfficeHours[]) {
    officeHours.sort((a, b) => {
      return moment(a.date).diff(moment(b.date));
    });
  }

  static getDayDistance(a: number, b: number) {
    return ((b - a) + 7) % 7;
  }

  static toTitleCase(str): string {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  static pad(num, size) {
    let s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  static makeId(length: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  async resetDatabase() {
    await this.resetCourses();
    await this.resetProfiles();
    await this.resetAccounts();
  }

  async resetCourses() {
    return await this.courseData
      .getCourseListRef()
      .snapshotChanges().pipe(take(1))
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
            number: c.payload.val().number.replace(/\u00a0/g, ' '),
            officeHours: [{key: '0'} as OfficeHours],
            instructors: ['0'],
            students: ['0']
          }))
        }
      )
      .subscribe(courses => {
        courses.map(course => {
          this.courseData.updateCourse(course);
        });
      });
  }

  async resetProfiles() {
    return await this.profileData
      .getProfileListRef()
      .snapshotChanges().pipe(take(1))
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
            name: c.payload.val().name,
            instructor: {courses: ['0'],
              officeHours: ['0']
            } as Instructor,
            student: {courses: ['0']} as Student,
          }))
        }
      )
      .subscribe(profiles => {
        profiles.map(profile => {
          console.log(profile);
          this.profileData.updateProfile(profile);
        });
      });
  }

  // resetOfficeHours() {
  //   this.courseData
  //     .getCourseList()
  //     .snapshotChanges()
  //     .map(changes => {
  //         return changes.map(c => ({
  //           key: c.payload.key,
  //           ...c.payload.val(),
  //           officeHours: ['0'],
  //         }))
  //       }
  //     )
  //     .subscribe(courses => {
  //       courses.map(course => {
  //         this.courseData.updateCourse(course);
  //
  //         this.profileData
  //           .getProfileList()
  //           .snapshotChanges()
  //           .map(changes => {
  //               return changes.map(c => ({
  //                 key: c.payload.key,
  //                 ...c.payload.val(),
  //                 instructor: {
  //                   officeHours: ['0']
  //                 },
  //               }))
  //             }
  //           )
  //           .subscribe(profiles => {
  //             profiles.map(profile => {
  //               this.profileData.updateProfile(profile);
  //             });
  //           });
  //       });
  //     });
  // }

  resetAccounts() {
    this.profileData
      .getProfileListRef()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }))
        }
      )
      .subscribe(profiles => {
        profiles.map(profile => {
          this.profileData.removeProfile(profile);
        });
      });
  }
}
