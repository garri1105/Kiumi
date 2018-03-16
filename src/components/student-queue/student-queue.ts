import {Component, Injectable} from '@angular/core';
import {StudentQueueProvider} from "../../providers/queue/queue";
import {Observable} from "rxjs/Observable";
import {Student} from "../../models/student/student.interface";

/**
 * Generated class for the StudentQueueComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'student-queue',
  templateUrl: 'student-queue.html'
})

@Injectable()
export class StudentQueueComponent {

  studentQueue$: Observable<Student[]>;

  constructor(private queue: StudentQueueProvider) {
    // this.studentQueue$ = this.queue.getMockStudentQueue();

    this.studentQueue$ = this.queue
      .getStudentQueue()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
  }

  removeMockStudent(student: Student) {
    this.queue.removeMockStudent(student);
  }

  addStudent(student: Student) {
    this.queue.addStudent(student);
  }

  removeStudent(student: Student) {
    this.queue.removeStudent(student);
  }

  

}

