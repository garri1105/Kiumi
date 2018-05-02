import { Component, Input } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
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

  constructor(private profileData: ProfileDataProvider,
              private studentQueueData: StudentQueueDataProvider) {

    this.profile = this.profileData.getProfile();
  }

  // This function allows an instructor to remove a student from the queue if they aren't at the office hours, 
  // have already been assisted, or have left. It takes in a Profile parameter and then removes that profile from the 
  // student queue. 
  removeStudent(profile: Profile) {
    this.studentQueue.forEach((student, i) => {
      if (student.key === profile.key) {
        this.studentQueue.splice(i, 1);
      }
    });

    return this.studentQueueData.updateQueue(this.studentQueue);
  }

// This function allows an instructor to move students up or down in the queue. If someone shows up late, the instructor
// can use this function to move them down in the queue if other students are ready to be assisted. 
  reorderQueue(indexes) {
    this.studentQueue = reorderArray(this.studentQueue, indexes);
    return this.studentQueueData.updateQueue(this.studentQueue);
  }
}
