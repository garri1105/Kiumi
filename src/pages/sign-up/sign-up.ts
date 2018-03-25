import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {LoginResponse} from "../../models/login/login-response.interface";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(private toast: ToastController,
              private navCtrl: NavController) {

  }

  signUp(event: LoginResponse) {
    if (!event.error) {
      this.toast.create({
        message: `Account created: ${event.result.email}`,
        duration: 3000
      }).present();

      this.navCtrl.setRoot('EditProfilePage');
    }
    else {
      this.toast.create({
        message: `Account not created. ${event.error.message}`,
        duration: 3000
      }).present();
    }
  }
}
