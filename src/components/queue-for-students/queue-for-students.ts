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

  // This function allows a user to check into or out of an office hours. If a student is already checked in, 
  // this toggle will check them out and remove them from the queue. If they aren't checked in yet, then this toggle 
  // will check them in and add them to the student queue.  
  toggleCheckIn() {
    this.checkedIn = !this.checkedIn;
    this.checkedIn ? this.addStudent() : this.removeStudent();
  }

  // This function adds the student's profile to the student queue. 
  addStudent() {
    this.studentQueue.push(this.profile);
    return this.studentQueueData.updateQueue(this.studentQueue);
  }

  // This function removes the student's profile from the student queue. 
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
