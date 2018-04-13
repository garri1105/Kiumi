import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { Course } from '../../models/course/course.interface';
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {OfficeHours} from "../../models/office-hours/office-hours.interface";
import {take} from "rxjs/operators";
import {Profile} from "../../models/profile/profile.interface";
import {Subscription} from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-student-queue',
  templateUrl: 'student-queue.html',
})
export class StudentQueuePage {

  course: Course;
  officeHours: OfficeHours;
  studentQueue: Profile[];
  studentQueue$: Subscription;
  ready: boolean;

  constructor(private navParams: NavParams,
              private studentQueueData: StudentQueueDataProvider,
              private profileData: ProfileDataProvider) {

    this.course = this.navParams.get('course');
    this.officeHours = this.navParams.get('officeHours');
    this.initStudentQueue();
  }

  initStudentQueue() {
    this.studentQueue$ =  this.studentQueueData.getStudentQueueRef(this.officeHours, this.course)
      .valueChanges().subscribe(studentQueue => {
      this.profileData.getProfileListRef()
        .valueChanges().pipe(take(1))
        .subscribe(profiles => {
          let queue = [];
          if (studentQueue) {
            studentQueue.forEach(studentKey => {
              profiles.forEach(profile => {
                if (profile.key === studentKey) {
                  queue.push(profile);
                }
              })
            });
          }
          this.studentQueue = queue;
        });
    });
  }

  ionViewWillUnload() {
    this.studentQueue$.unsubscribe();
  }
}
