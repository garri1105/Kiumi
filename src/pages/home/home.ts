import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { QueuePage } from '../queue/queue';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  clicked: boolean;
  checkInButton: HTMLElement;
  seconds: number;
  constructor(public navCtrl: NavController) {
    this.clicked = false;
    this.seconds = 0;

    var self = this;

    setInterval(function () {
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
      this.checkInButton.style.backgroundColor = '#488aff';
      this.checkInButton.textContent = 'Check in';
    }
    else
    {
      this.checkInButton.style.backgroundColor = 'lightgreen';
      this.checkInButton.textContent = 'Checked in';
    }
  }

  changeQueue() {
    this.navCtrl.push('QueuePage');
  }
}
