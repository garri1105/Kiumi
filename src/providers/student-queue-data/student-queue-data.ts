import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Student } from '../../models/student/student.interface';
import { Profile } from '../../models/profile/profile.interface';
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import { Course } from '../../models/course/course.interface';
import { CourseDataProvider } from '../course-data/course-data';
import {take} from "rxjs/operators";
import { ProfileDataProvider } from '../profile-data/profile-data';
import {OfficeHoursDataProvider} from "../office-hours-data/office-hours-data";

/*
  Generated class for the StudentQueueDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentQueueDataProvider {
  studentQueue: AngularFireList<string>;
  // private profileList = AngularFireLis<Profile>


  constructor(private db: AngularFireDatabase,
              private courseDataProvider: CourseDataProvider,
              private profileDataProvider: ProfileDataProvider,
              private officeHoursData: OfficeHoursDataProvider) {

  }

  getStudentQueue(officeHoursIndex: number, course: Course) {
    this.studentQueue = this.db.list(`course-list/${course.key}/officeHours/${officeHoursIndex}/studentQueue`);
    return this.studentQueue;
  }

  addStudent(student: Profile, indexOfOfficeHour: number, course: Course) {
      this.officeHoursData.getOfficeHoursByKey(course.key, indexOfOfficeHour)
        .subscribe(officeHours => {
          officeHours.studentQueue.push(student.key);
          this.courseDataProvider.updateCourse(course);
      });
  }

  removeStudent(student: Profile, indexOfOfficeHour: number, course: Course ) {
    this.courseDataProvider.getCourseByKey(course.key).
      subscribe((course: Course) => {
        course.officeHours[indexOfOfficeHour].studentQueue.splice(course.officeHours[indexOfOfficeHour].studentQueue.indexOf(student.key), 1);
        this.courseDataProvider.updateCourse(course);
      });
  }

}





