import { Component, Input } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { GlobalProfileProvider } from '../../providers/global-profile/global-profile';
import { Profile } from '../../models/profile/profile.interface';
import { Course } from '../../models/course/course.interface';

/**
 * Generated class for the QueueForStudentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'queue-for-students',
  templateUrl: 'queue-for-students.html'
})
export class QueueForStudentsComponent {

  @Input() course: Course;
  @Input() officeHourIndex: number;
  text: string;
  @Input() profile: Profile;
  @Input() studentQueue: string[];
  clicked: boolean;
  checkInButton: HTMLElement;
  // studentQueue: Profile[];

  constructor(private navParams: NavParams, private studentQueueDataProvider: StudentQueueDataProvider, private globalProfileProvider: GlobalProfileProvider) {
    this.profile = this.globalProfileProvider.getProfile();
    this.clicked = false;
    // this.course = this.navParams.get('course');
    console.log('Hello QueueForStudentsComponent Component');
    this.text = 'Hello World';

  }

  addStudent(indexOfOfficeHour: number) {
    this.studentQueueDataProvider.addStudent(this.profile, indexOfOfficeHour, this.course);
  }

  removeStudent(studentKey: string, indexOfOfficeHour: number) {
    this.studentQueueDataProvider.removeStudent(studentKey, indexOfOfficeHour, this.course);
  }


}
