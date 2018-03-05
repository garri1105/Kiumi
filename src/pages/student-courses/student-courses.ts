import {Component} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {StudentsService} from "../../services/students/students.service";
import {CoursesService} from "../../services/courses/courses.service";
import {Course} from "../../models/course.interface";
import {StudentLoginService} from "../../services/student-login/student-login.service";

/**
 * Generated class for the StudentCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-courses',
  templateUrl: 'student-courses.html',
})
export class StudentCoursesPage {

  studentCourses: Course[];
  constructor(private navParams: NavParams,
              private students: StudentsService,
              private courses: CoursesService,
              private loggedIn: StudentLoginService) {
  }

  ionViewDidLoad() {
    this.courses
      .getCourseList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
      .subscribe(courses => {
        this.studentCourses = courses.filter(course => this.loggedIn.student.courses.indexOf(course.key) > -1)
      });
  }
}
