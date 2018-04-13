import { Component, Input } from '@angular/core';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { Profile } from '../../models/profile/profile.interface';
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Course} from "../../models/course/course.interface";
import {AlertController} from "ionic-angular";

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
              private profileData: ProfileDataProvider,
              private alert: AlertController) {

    this.profile = this.profileData.getProfile();
  }

  toggleCheckIn() {
    if (!this.isInstructing) {
      this.checkedIn = !this.checkedIn;
      this.checkedIn ?
        this.addStudent().catch(e => this.alert.create({message: e}).present())
        : this.removeStudent().catch(e => this.alert.create({message: e}).present());
    }
    else {
     this.alert.create({
       title: 'Not allowed!',
       message: 'You can\'t check in if you are an instructor for the class',
       buttons: [
         {text: 'Ok', role: 'cancel',}
         ]
     }).present();
    }
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
