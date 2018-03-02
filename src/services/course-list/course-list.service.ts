import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Course} from "../../models/course.interface";
import {COURSE_LIST} from "../../mocks/course.mocks";

@Injectable()
export class CourseListService {

  classList = this.db.list<Course>('class-list');
  constructor(private db: AngularFireDatabase) {

  }

  getClass() {
    return this.classList;
  }

  getMockCourse() {
    return COURSE_LIST
  }
}
