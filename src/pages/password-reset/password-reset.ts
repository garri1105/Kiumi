import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Account} from "../../models/account/account.interface";

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  account: Account;
  constructor(private auth: AuthProvider, private navParams: NavParams) {
    this.account = this.navParams.get('account');
  }

  async sendPasswordResetEmail() {
    try {
      const result = await this.auth.sendPasswordResetEmail(this.account.email);
      console.log(result);
    }
    catch (e) {
      console.log(e);
    }
  }
}
