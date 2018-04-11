import { HttpClient } from '@angular/common/http';
import { Injectable, state } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Student } from '../../models/student/student.interface';
import { Profile } from '../../models/profile/profile.interface';
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import { Course } from '../../models/course/course.interface';
import { CourseDataProvider } from '../course-data/course-data';
import {take} from "rxjs/operators";
import { ProfileDataProvider } from '../profile-data/profile-data';
import { NavController } from 'ionic-angular';


/*
  Generated class for the StudentQueueDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentQueueDataProvider {
  private studentQueue = this.db.list<Profile>('student-queue');
  courseObject: AngularFireObject<Course>;
  // private navCtrl = NavController;
  // private profileList = AngularFireLis<Profile>


  constructor(private db: AngularFireDatabase, private courseDataProvider: CourseDataProvider, private profileDataProvider: ProfileDataProvider) {
    console.log('Hello StudentQueueDataProvider Provider');
  }

  addStudent(student: Profile, indexOfOfficeHour: number, course: Course) {
    // if(course.officeHours[indexOfOfficeHour].studentQueue.indexOf(student.key) == -1) {
      // Can't tell if this if statement is necessary, but tried it out in an effort to fix the overadding to studentQueue issue
      this.courseDataProvider.getCourseByKey(course.key)
        .subscribe((course: Course) => {
        course.officeHours[indexOfOfficeHour].studentQueue.push(student.key);
        this.courseDataProvider.updateCourse(course);
      });

    // }
  }

  removeStudent(studentKey: string, indexOfOfficeHour: number, course: Course ) {
    this.courseDataProvider.getCourseByKey(course.key).
      subscribe((course: Course) => {
        course.officeHours[indexOfOfficeHour].studentQueue.splice(course.officeHours[indexOfOfficeHour].studentQueue.indexOf(studentKey), 1);
        this.courseDataProvider.updateCourse(course);
      });
    
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

}





