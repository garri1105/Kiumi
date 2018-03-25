import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private navCtrl: NavController,
              private alert: AlertController) {
  }

  signOutResult(event: Promise<any>) {
      event
        .then(result => {
        this.navCtrl.setRoot("HomePage");
      })
        .catch(error =>
          this.alert.create({
            title: 'Failed to sign out',
            subTitle: error
          })
        );
  }
}
