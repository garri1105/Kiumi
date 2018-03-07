import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {StudentsService} from "../../services/students/students.service";
import {CoursesService} from "../../services/courses/courses.service";
import {Student} from "../../models/student.interface";
import {STUDENT_QUEUE} from "../../mocks/student.mocks";
import {COURSE_LIST} from "../../mocks/course.mocks";
import {Course} from "../../models/course.interface";
import {Observable} from "rxjs/Observable";
import { File } from "@ionic-native/file";
import {StudentLoginService} from "../../services/student-login/student-login.service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(private login: StudentLoginService,
              private courses: CoursesService) {
    this.login.studentList;
  }

  ionViewDidLoad() {
    this.courses
      .getCourseList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            times: [new Date().getTime() + 600000],
            ...c.payload.val()
          }))
        }
      )
      .subscribe(courses => {
        courses.map(course => this.courses.updateCourse(course));
      });
  }
}
