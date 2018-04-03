import { Component } from '@angular/core';
import {AlertController, IonicPage} from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  userProfile: any = null;

  constructor(private googlePlus: GooglePlus, private alert: AlertController) {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });
  }

  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '48365895185-ee3unrb93s0hs4mnbkmhe5u7n4fg1gjv.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      const googleCredential = firebase.auth.GoogleAuthProvider
        .credential(res.idToken);

      firebase.auth().signInWithCredential(googleCredential)
        .then( response => {
          console.log("Firebase success: " + JSON.stringify(response));
    });
      this.alert.create({
        message: 'Success'
      }).present();
  }, err => {
      console.error("Error: ", err);
      this.alert.create({
        message: 'Error:' + err
      }).present();
    });
  }
}
