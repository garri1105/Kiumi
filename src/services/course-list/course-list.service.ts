import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Course} from "../../models/course.interface";
import {COURSE_LIST} from "../../mocks/course.mocks";

@Injectable()
export class CourseListService {

  courseList = this.db.list<Course>('class-list');

  constructor(private db: AngularFireDatabase) {

  }

  getCourseList() {
    return this.courseList;
  }

  getMockCourseList() {
    return COURSE_LIST;
  }
}
