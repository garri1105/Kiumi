import { Component } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import {AngularFireDatabase} from "angularfire2/database";
// import { Student } from '../../models/student/student.interface';
import { Profile } from '../../models/profile/profile.interface';


/**
 * Generated class for the QueueForInstructorsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'queue-for-instructors',
  templateUrl: 'queue-for-instructors.html'
})
export class QueueForInstructorsComponent {

  // private studentQueue = this.db.list<Student>('student-queue');
  studentQueue: Profile[];

  text: string;

  constructor(private db: AngularFireDatabase ) {
    console.log('Hello QueueForInstructorsComponent Component');
    this.text = 'Hello World';
  }

}
