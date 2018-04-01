import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Course} from "../../models/course/course.interface";
import { StudentQueueDataProvider } from '../../providers/student-queue-data/student-queue-data';
import { Profile } from '../../models/profile/profile.interface';

@IonicPage()
@Component({
  selector: 'page-student-check-in',
  templateUrl: 'student-check-in.html',
})

export class StudentCheckInPage {
  course: Course;
  clicked: boolean;
  checkInButton: HTMLElement;
  studentQueueDataProvider: StudentQueueDataProvider;

  constructor(private navParams: NavParams) {

    this.clicked = false;
    this.course = this.navParams.get('course');
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

  addStudent(student: Profile) {
    this.studentQueueDataProvider.addStudent(student);
  }



}
