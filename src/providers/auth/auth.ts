import {Injectable} from '@angular/core';
import {LoginResponse} from "../../models/login/login-response.interface";
import {AngularFireAuth} from "angularfire2/auth";
import {Account} from '../../models/account/account.interface';
import * as firebase from 'firebase/app';
import {GooglePlus} from "@ionic-native/google-plus";
import {AlertController, Platform} from "ionic-angular";

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform,
              private alert: AlertController) {
  }

  async sendPasswordResetEmail(email: string) {
      return await this.afAuth.auth.sendPasswordResetEmail(email);
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin().then(r => {
        console.log('hi');
        console.log(r)
      });
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '48365895185-7vnbechfbhvgnbp96r02b9m31u5gok4s.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch (e) {
      console.log(e);
      this.alert.create({
        message: 'Native error: ' + e
      }).present();
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      return await this.afAuth.auth.signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  }

  getAuthenticatedUser() {
    return this.afAuth.authState
  }

  async createUserWithEmailAndPassword(account) {
    try {
      return <LoginResponse> {
        result: await this.afAuth.auth.createUserWithEmailAndPassword(
          account.email,
          account.password)
      }
    }
    catch (e) {
      return <LoginResponse> {
        error: e
      }
    }
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    }
    catch (e) {
      if (e.code === 'auth/wrong-password') {
        e.message = 'Invalid email or password combination'
      }
      return <LoginResponse> {
        error: e,
      };
    }
  }

  async signOut() {
    try {
      await this.afAuth.auth.signOut();
      return true;
    }
    catch (e) {
      return false;
    }
  }
}
