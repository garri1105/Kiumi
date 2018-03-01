import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-class-queue',
  templateUrl: 'class-queue.html'
})
export class ClassQueuePage {

  constructor(private navCtrl: NavController, private navParams: NavParams)  {
  }
}
