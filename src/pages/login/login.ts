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

  // This login function takes a LoginResponse input and then sets the user's root page to the TabsPage that displays
  // their courses if the login was successful. If the login was not successful, then an error message is displayed 
  // and the root page is not changed for the user. 
  login(event: LoginResponse) {
    if(!event.error) {
      this.profileData.getProfileRef(<User>event.result).pipe(take(1))
        .subscribe(profile => {
          profile ?
                this.navCtrl.setRoot('TabsPage')
                : this.navCtrl.setRoot('EditProfilePage')
        });
    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
  }
}
