import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Student } from "../../models/student.interface";
import {Observable} from "rxjs/Observable";
import {STUDENT_QUEUE} from "../../mocks/student.mocks";

@Injectable()
export class StudentQueueService {

  private studentQueue = this.db.list<Student>('traffionic');

  constructor(private db: AngularFireDatabase) {

  }

  getMockStudentQueue() {
    return Observable.of(STUDENT_QUEUE);
  }

  removeMockStudent(student: Student) {
    STUDENT_QUEUE.splice(STUDENT_QUEUE.indexOf(student), 1);
  }

  getStudentQueue() {
    return this.studentQueue;
  }
}
