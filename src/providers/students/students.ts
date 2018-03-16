import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Student } from "../../models/student/student.interface";

@Injectable()
export class StudentsProvider {

  private studentList = this.db.list<Student>('student-list');

  constructor(private db: AngularFireDatabase) {

  }

  getStudentList() {
    return this.studentList;
  }

  addStudent(student: Student) {
    this.studentList.push(student);
  }

  removeStudent(student: Student) {
    this.studentList.remove(student.key);
  }

  updateStudent(student: Student) {
    this.studentList.update(student.key, student);
  }
}
