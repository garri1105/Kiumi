import {EventEmitter, Injectable} from '@angular/core';
import {LoginResponse} from "../../models/login/login-response.interface";
import {AngularFireAuth} from "angularfire2/auth";
import {Account} from '../../models/account/account.interface'
import {NavController, ToastController} from "ionic-angular";
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
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
    catch(e) {
      return <LoginResponse> {
        error: e
      }
    }
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.afAuth
          .auth
          .signInWithEmailAndPassword(account.email, account.password)
      };
    }
    catch (e) {
      return <LoginResponse> {
        error: e,
      };
    }
  }

}
