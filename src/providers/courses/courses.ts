import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Course } from "../../models/course/course.interface";

@Injectable()
export class CoursesProvider {

  private courseList = this.db.list<Course>('course-list');

  constructor(private db: AngularFireDatabase) {

  }

  getCourseList() {
    return this.courseList;
  }

  addCourse(course: Course) {
    this.courseList.push(course);
  }

  removeCourse(course: Course) {
    this.courseList.remove(course.key);
  }

  updateCourse(course: Course) {
    this.courseList.update(course.key, course);
  }
}
