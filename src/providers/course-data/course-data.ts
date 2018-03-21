import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Course } from "../../models/course/course.interface";
import {of} from "rxjs/observable/of";
import {concat} from "rxjs/observable/concat";

@Injectable()
export class CourseDataProvider {

  private courseList = this.db.list<Course>('course-list');

  constructor(private db: AngularFireDatabase) {

  }

  getCourseList() {
    return this.courseList;
  }

  getCourseByKey(key: string) {
    return this.db.object(`course-list/${key}`);
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

  searchCourse(query: string) {
    const numberQuery = this.db.list<Course>('course-list', ref =>
      ref.orderByChild('number')
        .startAt(query.toUpperCase())
        .endAt(query.toUpperCase() + "\uf8ff"));

    const titleQuery = this.db.list<Course>('course-list', ref =>
      ref.orderByChild('title')
        .startAt(CourseDataProvider.toTitleCase(query))
        .endAt(CourseDataProvider.toTitleCase(query) + "\uf8ff"));

    return concat(of(numberQuery), of(titleQuery));
  }

  static toTitleCase(str): string {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}
