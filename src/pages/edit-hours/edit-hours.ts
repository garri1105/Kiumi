import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the EditHoursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-hours',
  templateUrl: 'edit-hours.html',
})
export class EditHoursPage {
  courseKey: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.courseKey = this.navParams.get("courseKey");
  }

  ionViewDidLoad() {
  }

}
