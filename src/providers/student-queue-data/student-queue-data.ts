import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
// import {} from '..';
import { Student } from '../../models/student/student.interface';
import { Profile } from '../../models/profile/profile.interface';
import { OfficeHours } from '../../models/office-hours/office-hours.interface';
import { Course } from '../../models/course/course.interface';
import { CourseDataProvider } from '../course-data/course-data';

/*
  Generated class for the StudentQueueDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentQueueDataProvider {
  private studentQueue = this.db.list<Profile>('student-queue');


  constructor(private db: AngularFireDatabase, private courseDataProvider: CourseDataProvider) {
    console.log('Hello StudentQueueDataProvider Provider');
  }

  addStudent(student: Profile, indexOfOfficeHour: number, course: Course) {
    course.officeHours[indexOfOfficeHour].studentQueue.push(student.key);
    this.courseDataProvider.updateCourse(course);
  }

  // removeStudent(student: Profile, officeHours: OfficeHours) {
  //   officeHours.studentQueue.pop(student);
  // }

  }

    // var course$ = this.courseData.getCourseByKey(courseKey).valueChanges().pipe(take(1));

    // course$.subscribe((course: Course) => {
    //   course.officeHours.push(officeHours);
    //   this.courseData.updateCourse(course)
    // });




