import { Component, Input } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import {AngularFireDatabase} from "angularfire2/database";
// import { Student } from '../../models/student/student.interface';
import { Profile } from '../../models/profile/profile.interface';
import { Course } from '../../models/course/course.interface';
import { ProfileDataProvider } from '../../providers/profile-data/profile-data';


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
  @Input() course: Course;
  studentQueue: string[];
  text: string;
  // profileDataProvider: ProfileDataProvider;

  constructor(private db: AngularFireDatabase, public profileDataProvider: ProfileDataProvider) {
    // this.studentQueue = this.course.officeHours[1].studentQueue;
    // console.log(this.studentQueue);
    // console.log(this.course);

    console.log('Hello QueueForInstructorsComponent Component');
    this.text = 'Hello World';
  }

 
  ngOnInit() {
    console.log(this.course);
    this.studentQueue = this.course.officeHours[1].studentQueue;
    console.log(this.studentQueue);
  }

}
