import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from "../providers/auth/auth";
import {ProfileDataProvider} from "../providers/profile-data/profile-data";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private auth: AuthProvider,
              private profileData: ProfileDataProvider) {

    this.getUserCacheAndRedirect();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getUserCacheAndRedirect() {
    this.auth.getAuthenticatedUser().subscribe(auth => {
      console.log('First subscription. App Component. Authenticated User');
      if (!auth) {
        this.rootPage = 'HomePage';
      }
      else {
        this.profileData.getProfileRef(auth)
          .subscribe(profile => {
            console.log('Second subscription. App Component. Getting Profile');
            profile ? this.rootPage = 'TabsPage'
              : this.rootPage = 'EditProfilePage';
          });

        console.log('app loadProfile');
        this.profileData.loadProfile()
          .then(r => console.log(r))
          .catch(e => console.log(e));
      }
    });
  }
}

