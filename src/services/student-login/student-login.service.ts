import { Injectable } from "@angular/core";
import { Student } from "../../models/student.interface";
import {StudentsService} from "../students/students.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StudentLoginService {
  public student: Student;
  studentList: Student[];
  studentList$: Observable<Student[]>;

  constructor(private students: StudentsService) {
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


