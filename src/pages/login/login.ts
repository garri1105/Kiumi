import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginResponse} from "../../models/login/login-response.interface";
import {DataProvider} from "../../providers/data/data";
import {User} from "firebase/app";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              private data: DataProvider) {
  }

  login(event: LoginResponse) {
    if(!event.error) {
      this.toast.create({
        message: `Welcome to Beep, ${event.result.email}`,
        duration: 3000
      }).present();

      this.data.getProfile(<User>event.result)
        .subscribe(profile => {
          profile
            .valueChanges()
            .subscribe(value => {
              console.log(value);
              value ? this.navCtrl.setRoot('HomePage') : this.navCtrl.setRoot('EditProfilePage')
        })});
    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
  }
}
