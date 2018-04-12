import { Component, Input } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import {AngularFireDatabase} from "angularfire2/database";
import { Profile } from '../../models/profile/profile.interface';
import { Course } from '../../models/course/course.interface';
import { ProfileDataProvider } from '../../providers/profile-data/profile-data';

@Component({
  selector: 'queue-for-instructors',
  templateUrl: 'queue-for-instructors.html'
})
export class QueueForInstructorsComponent {
  @Input() officeHourIndex: number;
  @Input() course: Course;
  @Input() studentQueue: string[];

  profile: Profile;

  // studentQueue: AngularFireObject<string[]>;
  // studentQueue: string[];

  constructor(private db: AngularFireDatabase,
              private profileData: ProfileDataProvider,
              private studentQueueDataProvider: StudentQueueDataProvider) {

    this.profile = this.profileData.getProfile();
    // this.studentQueue = this.course.officeHours[1].studentQueue;
  }


  ngOnInit() {
    // this.studentQueue = this.studentQueueDataProvider.getStudentQueue(this.course, 1);
    // this.studentQueue.valueChanges();
  }

  removeStudent(studentKey: string, indexOfOfficeHour: number) {
    this.studentQueueDataProvider.removeStudent(this.profile, indexOfOfficeHour, this.course);
  }

}
