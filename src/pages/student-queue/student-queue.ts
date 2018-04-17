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
  instructors: Profile[];
  studentQueue: Profile[];
  studentQueue$: Subscription;

  constructor(private navParams: NavParams,
              private studentQueueData: StudentQueueDataProvider,
              private profileData: ProfileDataProvider) {

    this.course = this.navParams.get('course');
    this.officeHours = this.navParams.get('officeHours');
  }

  ionViewWillEnter() {
    console.log('Entering student-queue page');

    this.instructors = this.getInstructors();

    this.studentQueue$ =  this.studentQueueData.getStudentQueueRef(this.officeHours, this.course)
      .valueChanges().subscribe(studentQueue => {
        this.initStudentQueue(studentQueue);
      })

  }

  ionViewWillLeave() {
    console.log('Leaving student-queue page');
    this.studentQueue$.unsubscribe();
  }

  initStudentQueue(studentQueue: string[]) {
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
  }

  getInstructors() {
    let instructors: Profile[] = [];

    this.officeHours.instructors.forEach(instructorId => {
      this.profileData.getProfileById(instructorId)
        .pipe(take(1)).subscribe(instructor => {
          if (instructor) {
            instructors.push(instructor);
          }
      });
    });

    return instructors;
  }
}
