import { Component } from '@angular/core';
import {AlertController, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private alert: AlertController) {
  }

  signOutResult(event: Promise<any>) {
      event
        .then(r => {
          console.log('Sign out successful: ' + r);
      })
        .catch(error =>
          this.alert.create({
            title: 'Failed to sign out',
            subTitle: error
          })
        );
  }
}
