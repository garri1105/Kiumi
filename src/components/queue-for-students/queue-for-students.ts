import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { Profile } from '../../models/profile/profile.interface';
import { Course } from '../../models/course/course.interface';
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";

@Component({
  selector: 'queue-for-students',
  templateUrl: 'queue-for-students.html'
})
export class QueueForStudentsComponent {

  @Input() course: Course;
  @Input() officeHourIndex: number;
  @Input() studentQueue: string[];
  profile: Profile;

  constructor(private navParams: NavParams,
              private studentQueueData: StudentQueueDataProvider,
              private profileData: ProfileDataProvider) {

    this.profile = this.profileData.getProfile();
  }

  addStudent(indexOfOfficeHour: number) {
    this.studentQueueData.addStudent(this.profile, indexOfOfficeHour, this.course);
  }

  removeStudent(studentKey: string, indexOfOfficeHour: number) {
    this.studentQueueData.removeStudent(this.profile, indexOfOfficeHour, this.course);
  }


}
