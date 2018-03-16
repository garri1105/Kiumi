import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {StudentsProvider} from "../../providers/students/students";
import {CoursesProvider} from "../../providers/courses/courses";
import {Student} from "../../models/student/student.interface";
import {STUDENT_QUEUE} from "../../mocks/student.mocks";
import {COURSE_LIST} from "../../mocks/course.mocks";
import {Course} from "../../models/course/course.interface";
import {Observable} from "rxjs/Observable";
import {StudentLoginProvider} from "../../providers/student-login/student-login";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(private login: StudentLoginProvider,
              private courses: CoursesProvider) {
  }

  ionViewDidLoad() {
    // this.courses
    //   .getCourseList()
    //   .snapshotChanges()
    //   .map(changes => {
    //       return changes.map(c => ({
    //         key: c.payload.key,
    //         times: new Date().getTime() + 600000,
    //         ...c.payload.val()
    //       }))
    //     }
    //   )
    //   .subscribe(courses => {
    //     courses.map(course => this.courses.updateCourse(course));
    //   });
  }
}
