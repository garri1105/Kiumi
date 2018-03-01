import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Student } from "../../models/student.model";

@Injectable()
export class StudentQueueService {

  private studentQueue = this.db.list<Student>('traffionic');

  constructor(private db: AngularFireDatabase) {

  }

  getStudentQueue() {
    return this.studentQueue;
  }

}
