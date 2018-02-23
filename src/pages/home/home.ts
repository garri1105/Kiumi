import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
<<<<<<< HEAD
  changeQueue() {
    var queueButton: HTMLElement = document.getElementById('queueIn')
    queueButton.style.backgroundColor = 'lightgreen';
    queueButton.textContent = 'Queued';
  }

=======
>>>>>>> 983ae5bff5b16fe8795f0575b9c2967c5c7992ad
}
