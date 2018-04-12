import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from "../providers/auth/auth";
import {ProfileDataProvider} from "../providers/profile-data/profile-data";
import {take} from "rxjs/operators";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private auth: AuthProvider,
              private profileData: ProfileDataProvider) {

    this.auth.getAuthenticatedUser().subscribe(auth => {
      if (!auth) {
        this.rootPage = 'HomePage';
      }
      else {
        this.profileData.getProfileRef(auth)
          .subscribe(profile => {
            profile.valueChanges().pipe(take(1))
              .subscribe(value => {
                value ? this.rootPage = 'TabsPage'
                  : this.rootPage = 'EditProfilePage';
              });
          });

        this.profileData.loadProfile()
          .then(r => console.log(r))
          .catch(e => console.log(e));
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

