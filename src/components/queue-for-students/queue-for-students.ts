import { Component, Input } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { Profile } from '../../models/profile/profile.interface';
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Course} from "../../models/course/course.interface";

@Component({
  selector: 'queue-for-students',
  templateUrl: 'queue-for-students.html'
})
export class QueueForStudentsComponent {

  @Input() studentQueue: Profile[];
  @Input() course: Course;
  isInstructing: boolean;
  profile: Profile;
  checkedIn: boolean;

  constructor(private studentQueueData: StudentQueueDataProvider,
              private profileData: ProfileDataProvider) {

    this.profile = this.profileData.getProfile();
  }

  toggleCheckIn() {
    this.checkedIn = !this.checkedIn;
    this.checkedIn ? this.addStudent() : this.removeStudent();
  }

  addStudent() {
    this.studentQueue.push(this.profile);
    return this.studentQueueData.updateQueue(this.studentQueue);
  }

  removeStudent() {
    this.studentQueue.forEach((student, i) => {
      if (student.key === this.profile.key) {
        this.studentQueue.splice(i, 1);
      }
    });

    return this.studentQueueData.updateQueue(this.studentQueue);
  }

  ngOnInit() {
    this.studentQueue.forEach(student => {
      if (student.key === this.profile.key) {
        this.checkedIn = true;
      }
    });

    if (this.profile.instructor) {
      this.profile.instructor.courses.forEach(courseKey => {
        if (courseKey === this.course.key) {
          this.isInstructing = true;
        }
      });
    }
  }
}
