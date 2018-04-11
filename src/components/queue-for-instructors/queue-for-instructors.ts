import { Component, Input } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
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
  @Input() profile: Profile;
  @Input() course: Course;
  // studentQueue: AngularFireObject<string[]>;
  studentQueue: string[];
  text: string;

  constructor(private db: AngularFireDatabase, public profileDataProvider: ProfileDataProvider, private studentQueueDataProvider: StudentQueueDataProvider) {
    // this.studentQueue = this.course.officeHours[1].studentQueue;
    // console.log(this.studentQueue);
    // console.log(this.course);

    console.log('Hello QueueForInstructorsComponent Component');
    this.text = 'Hello World';
  }

 
  ngOnInit() {
    console.log(this.course);
    this.studentQueue = this.course.officeHours[1].studentQueue;
    // this.studentQueue.valueChanges();
    console.log(this.studentQueue);
  }

  removeStudent(studentKey: string, indexOfOfficeHour: number) {
    this.studentQueueDataProvider.removeStudent(studentKey, indexOfOfficeHour, this.course);
  }


}
