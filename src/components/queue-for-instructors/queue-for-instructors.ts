import { Component, Input } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import {AngularFireDatabase} from "angularfire2/database";
import { Profile } from '../../models/profile/profile.interface';
import { ProfileDataProvider } from '../../providers/profile-data/profile-data';
import {reorderArray} from "ionic-angular";

@Component({
  selector: 'queue-for-instructors',
  templateUrl: 'queue-for-instructors.html'
})
export class QueueForInstructorsComponent {
  @Input() studentQueue: Profile[];

  profile: Profile;

  constructor(private db: AngularFireDatabase,
              private profileData: ProfileDataProvider,
              private studentQueueData: StudentQueueDataProvider) {

    this.profile = this.profileData.getProfile();
  }

  removeStudent(profile: Profile) {
    this.studentQueue.forEach((student, i) => {
      if (student.key === profile.key) {
        this.studentQueue.splice(i, 1);
      }
    });

    return this.studentQueueData.updateQueue(this.studentQueue);
  }

  reorderQueue(indexes) {
    this.studentQueue = reorderArray(this.studentQueue, indexes);
    return this.studentQueueData.updateQueue(this.studentQueue);
  }
}
