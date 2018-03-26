import { Injectable } from '@angular/core';
import {CourseDataProvider} from "../course-data/course-data";
import {ProfileDataProvider} from "../profile-data/profile-data";
import {Student} from "../../models/student/student.interface";
import {Instructor} from "../../models/instructor/instructor.interface";

@Injectable()
export class UtilitiesProvider {

  constructor(private courseData: CourseDataProvider,
              private profileData: ProfileDataProvider) {

  }

  static toTitleCase(str): string {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  resetCourses() {
    this.courseData
      .getCourseList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
            officeHours: ['0'],
            instructors: ['0'],
            students: ['0']
          }))
        }
      )
      .subscribe(courses => {
        courses.map(course => {
          console.log(course);
          this.courseData.updateCourse(course);
        });
      });
    this.resetStudents();
    this.resetInstructors();
  }

  resetStudents() {
    this.courseData
      .getCourseList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
            students: ['0'],
          }))
        }
      )
      .subscribe(courses => {
        courses.map(course => {
          this.courseData.updateCourse(course);

          this.profileData
            .getProfileList()
            .snapshotChanges()
            .map(changes => {
                return changes.map(c => ({
                  key: c.payload.key,
                  ...c.payload.val(),
                  student: <Student> {
                    courses: ['0']
                  },
                }))
              }
            )
            .subscribe(profiles => {
              profiles.map(profile => {
                this.profileData.updateProfile(profile);
              });
            });
        });
      });
  }

  resetInstructors() {
    this.courseData
      .getCourseList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
            instructors: ['0'],
          }))
        }
      )
      .subscribe(courses => {
        courses.map(course => {
          this.courseData.updateCourse(course);

          this.profileData
            .getProfileList()
            .snapshotChanges()
            .map(changes => {
                return changes.map(c => ({
                  key: c.payload.key,
                  ...c.payload.val(),
                  instructor: <Instructor> {
                    courses: ['0'],
                    officeHours: ['0']
                  },
                }))
              }
            )
            .subscribe(profiles => {
              profiles.map(profile => {
                this.profileData.updateProfile(profile);
              });
            });
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

  resetProfiles() {
    this.profileData
      .getProfileList()
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
          this.resetCourses();
        });
      });
  }
}
