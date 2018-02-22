import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  people: string[] = [];

  constructor(public navCtrl: NavController) {

  }

  changeColor() {
    var checkInButton: HTMLElement = document.getElementById('checkIn')
    checkInButton.style.backgroundColor = 'lightgreen';
    checkInButton.textContent = 'Checked in';
  }

}
