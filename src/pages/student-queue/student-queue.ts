import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { Profile } from '../../models/profile/profile.interface';
import { Course } from '../../models/course/course.interface';
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";

@IonicPage()
@Component({
  selector: 'page-student-queue',
  templateUrl: 'student-queue.html',
})
export class StudentQueuePage {

  course: Course;
  profile: Profile;
  officeHourIndex: number;
  clicked: boolean;
  checkInButton: HTMLElement;
  studentQueue: string[];

  constructor(private navParams: NavParams,
              private studentQueueData: StudentQueueDataProvider,
              private profileData: ProfileDataProvider) {
    this.profile = this.profileData.getProfile();
    this.clicked = false;
    this.course = this.navParams.get('course');
    this.officeHourIndex = this.navParams.get('i') + 1;
    console.log(this.officeHourIndex);
    // console.log(this.course.officeHours[this.officeHourIndex]);
    this.getStudentQueue(this.course, this.officeHourIndex);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentQueuePage');
  }

  changeColor() {
    this.checkInButton = document.getElementById('checkIn');
    this.clicked = !this.clicked;
    if (!this.clicked)
    {
      this.checkInButton.style.color = '#01426A';
      this.checkInButton.textContent = 'Check in';
    }
    else
    {
      this.checkInButton.style.color = '#32db64';
      this.checkInButton.textContent = 'Checked in';
    }
  }

  getStudentQueue(course: Course, officeHourIndex: number) {
    this.studentQueueData.getStudentQueue(officeHourIndex, course).valueChanges().subscribe(queue => {
      this.studentQueue = queue
      console.log(queue)
    });
    console.log(this.studentQueue);
  }

}
