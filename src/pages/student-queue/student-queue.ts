import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { GlobalProfileProvider } from '../../providers/global-profile/global-profile';
import { Profile } from '../../models/profile/profile.interface';
import { Course } from '../../models/course/course.interface';

/**
 * Generated class for the StudentQueuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-queue',
  templateUrl: 'student-queue.html',
})
export class StudentQueuePage {

  course: Course;
  profile: Profile;
  clicked: boolean;
  checkInButton: HTMLElement;

  constructor(private navParams: NavParams, private studentQueueDataProvider: StudentQueueDataProvider, private globalProfileProvider: GlobalProfileProvider) {
    this.profile = this.globalProfileProvider.getProfile();
    this.clicked = false;
    this.course = this.navParams.get('course');
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

  addStudent(student: Profile, indexOfOfficeHour: number, course: Course) {
    this.studentQueueDataProvider.addStudent(student, indexOfOfficeHour, course);
  }


}
