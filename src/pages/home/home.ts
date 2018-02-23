import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QueuePage } from '../queue/queue';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  people: string[] = [];
  clicked: boolean = false;
  checkInButton: HTMLElement;
  constructor(public navCtrl: NavController) {
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
    this.navCtrl.push(QueuePage);
    var queueButton: HTMLElement = document.getElementById('queueIn')
    queueButton.style.backgroundColor = 'lightgreen';
  }

}
