import {Component} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {StudentsProvider} from "../../providers/students/students";
import {CoursesProvider} from "../../providers/courses/courses";
import {Course} from "../../models/course/course.interface";
import {StudentLoginProvider} from "../../providers/student-login/student-login";

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
              private students: StudentsProvider,
              private courses: CoursesProvider,
              private loggedIn: StudentLoginProvider) {
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
