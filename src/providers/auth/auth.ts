import {Injectable} from '@angular/core';
import {LoginResponse} from "../../models/login/login-response.interface";
import {AngularFireAuth} from "angularfire2/auth";
import {Account} from '../../models/account/account.interface'

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

  async signOut() {
      try {
        await this.afAuth.auth.signOut();
        return true;
      }
      catch(e) {
        return false;
      }
  }

}
