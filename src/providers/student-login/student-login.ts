import { Injectable } from "@angular/core";
import { Student } from "../../models/student/student.interface";
import {StudentsProvider} from "../students/students";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StudentLoginProvider {
  public student: Student;
  studentList: Student[];
  studentList$: Observable<Student[]>;

  constructor(private students: StudentsProvider) {
    this.studentList$ = this.students
      .getStudentList()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

    this.studentList$.subscribe(students =>
      this.student = students[Math.floor(Math.random()*students.length)]);
  }
}


