import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { StudentQueueService } from '../../services/queue/queue.service';
import { StudentLoginService } from "../../services/student-login/student-login.service";
import {Course} from "../../models/course.interface";


@IonicPage()
@Component({
  selector: 'page-student-check-in',
  templateUrl: 'student-check-in.html',
})

export class StudentCheckInPage {
  course: Course;
  estimatedTime: string;
  clicked: boolean;
  checkInButton: HTMLElement;
  x: number;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private studentQueue: StudentQueueService,
              private loggedIn: StudentLoginService) {

    this.clicked = false;
    this.course = this.navParams.get('course');

    var self = this;

    this.x = setInterval(function() {
      var countDownDate = self.course.times[0];

      var now = new Date().getTime();

      var distance = countDownDate - now;

      console.log(distance);

      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.estimatedTime = "";

      if (distance >= 3600000) {
        this.estimatedTime += self.pad(hours, 2) + ":";
      }
      document.getElementById("timeEstimate").textContent =
        this.estimatedTime +
        self.pad(minutes, 2) + ":" + self.pad(seconds, 2);

    }, 1000);
  }

  pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  increaseEstimate() {
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

  addStudent() {
    this.studentQueue.addStudent(this.loggedIn.student);
  }

  ionViewWillLeave() {
    clearInterval(this.x);
  }
}
