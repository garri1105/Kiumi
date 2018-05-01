import { Injectable } from "@angular/core";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Course } from "../../models/course/course.interface";
import {take} from "rxjs/operators";

@Injectable()
export class CourseDataProvider {

  private courseObject: AngularFireObject<Course>;
  private courseList$: AngularFireList<Course> = this.db.list<Course>('course-list');

  constructor(private db: AngularFireDatabase) {

  }

  getCourseListRef() {
    return this.courseList$;
  }

  getCourseByKey(key: string) {
    this.courseObject = this.db.object(`course-list/${key}`);

    return this.courseObject.valueChanges().pipe(take(1));
  }

  addCourse(course: Course) {
    return this.courseList$.push(course);
  }

  removeCourse(course: Course) {
    return this.courseList$.remove(course.key);
  }

  updateCourse(course: Course) {
    return this.courseList$.update(course.key, course);
  }

  async searchCourse(query: string) {
    let courseList = [];
    const numberQuery = this.db.list<Course>('course-list', ref =>
      ref.orderByChild('number')
        .startAt(query.toUpperCase())
        .endAt(query.toUpperCase() + "\uf8ff")).valueChanges().pipe(take(1));

    const titleQuery = this.db.list<Course>('course-list', ref =>
      ref.orderByChild('title')
        .startAt(CourseDataProvider.toTitleCase(query))
        .endAt(CourseDataProvider.toTitleCase(query) + "\uf8ff")).valueChanges().pipe(take(1));

    numberQuery.subscribe(r => courseList = courseList.concat(r));
    titleQuery.subscribe(r => courseList = courseList.concat(r));

    await numberQuery.toPromise();
    await titleQuery.toPromise();

    return courseList;
  }

  static toTitleCase(str): string {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}
