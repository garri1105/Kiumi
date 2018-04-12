import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginResponse} from "../../models/login/login-response.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {User} from "firebase/app";
import {take} from "rxjs/operators";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              private profileData: ProfileDataProvider) {
  }

  login(event: LoginResponse) {
    if(!event.error) {
      this.profileData.getProfileRef(<User>event.result)
        .subscribe(profile => {
          profile.valueChanges().pipe(take(1))
            .subscribe(value => {
              value ?
                this.navCtrl.setRoot('TabsPage')
                : this.navCtrl.setRoot('EditProfilePage')
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
