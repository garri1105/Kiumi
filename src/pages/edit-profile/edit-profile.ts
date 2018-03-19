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

  saveProfileResult(event: Boolean) {
    if (event) {
      this.toast.create({
        message: 'Profile saved succesfully',
        duration: 3000
      }).present();

      this.navCtrl.setRoot('AddCoursesPage');
    }
    else {
      this.toast.create({
        message: 'Profile failed to save',
        duration: 3000
      }).present();
    }
  }
}
