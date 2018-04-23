import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(private toast: ToastController,
              private navCtrl: NavController) {
  }

  // This saveProfileResult function takes in an event input that's a boolean and then successfully saves the 
  // profile if that boolean is true. If it's not true, then the user sees that the profile failed to save. 
  saveProfileResult(event: Boolean) {
    if (event) {
      this.toast.create({
        message: 'Profile saved succesfully',
        duration: 1000
      }).present();

      this.navCtrl.setRoot('TabsPage');
    }
    else {
      this.toast.create({
        message: 'Profile failed to save',
        duration: 3000
      }).present();
    }
  }
}
