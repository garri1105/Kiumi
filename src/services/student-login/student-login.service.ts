import {STUDENT_QUEUE} from "../../mocks/student.mocks";
import { Injectable } from "@angular/core";
import { Student } from "../../models/student.interface";

@Injectable()
export class StudentLoginService {
  public student: Student;

  constructor() {
    for (var i = 0; i < Number(Math.random()*4 + 1); i++) {
      this.student = STUDENT_QUEUE.pop();
    }
  }
}


