import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Course} from "../../models/course.interface";

@IonicPage()
@Component({
  selector: 'page-student-check-in',
  templateUrl: 'student-check-in.html',
})

export class StudentCheckInPage {
  clicked: boolean;
  checkInButton: HTMLElement;
  seconds: number;
  x: number;
  constructor(private navCtrl: NavController,
              private course: Course) {
    this.clicked = false;
    this.seconds = 0;

    var self = this;

    this.x = setInterval(function () {
      if (self.seconds > 0) {
        let text = "";
        self.seconds -= 1;
        if (self.seconds >= 3600) {
          text += self.pad(Math.floor(self.seconds / 3600), 2) + ":";
        }
        document.getElementById("timeEstimate").textContent =
          text +
          self.pad(Math.floor((self.seconds % 3600) / 60), 2) + ":" +
          self.pad(self.seconds % 60, 2);

      }}, 1000);
  }

  pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  increaseEstimate() {
    if (this.clicked) {
      this.seconds += 600;
    }
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

  ionViewWillLeave() {
    clearInterval(this.x);
  }
}
