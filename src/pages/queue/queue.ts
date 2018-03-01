import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StudentQueueService} from "../../services/queue/queue.service";
import {Observable} from "rxjs/Observable";
import {Student} from "../../models/student.interface";

@IonicPage()
@Component({
  selector: 'page-queue',
  templateUrl: 'queue.html'
})
export class QueuePage {

  studentQueue$: Observable<Student[]>;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private queue: StudentQueueService)
  {
    this.studentQueue$ = this.queue.getMockStudentQueue();

    // this.studentQueue$ = this.queue
    //   .getStudentQueue()
    //   .snapshotChanges()
    //   .map(
    //     changes => {
    //       return changes.map(c => ({
    //         key: c.payload.key, ...c.payload.val()
    //       }))
    //     }
    //   )
  }

  removeMockStudent(student: Student) {
    this.queue.removeMockStudent(student);
  }
}
