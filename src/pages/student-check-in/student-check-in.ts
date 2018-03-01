import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

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
  constructor(public navCtrl: NavController) {
    this.clicked = false;
    this.seconds = 0;

    var self = this;

    this.x = setInterval(function () {
      if (self.seconds > 0) {
        self.seconds -= 1;
        document.getElementById("timeEstimate").textContent =
          self.pad(Math.floor(self.seconds / 60), 2) + ":" + self.pad(self.seconds % 60, 2);

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
      this.checkInButton.style.color = '#488aff';
      this.checkInButton.textContent = 'Check in';
    }
    else
    {
      this.checkInButton.style.color = 'lightgreen';
      this.checkInButton.textContent = 'Checked in';
    }
  }

  ionViewWillLeave() {
    clearInterval(this.x);
  }
}
