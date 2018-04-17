import { Component } from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Account} from "../../models/account/account.interface";

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  account: Account;
  constructor(private auth: AuthProvider,
              private navParams: NavParams,
              private alert: AlertController) {

    this.account = this.navParams.get('account');
  }

  async sendPasswordResetEmail() {
    try {
      const result = await this.auth.sendPasswordResetEmail(this.account.email);
      this.alert.create({
        title: 'Success!',
        message: 'Check your email to reset your passoword',
      }).present();
    }
    catch (e) {
      this.alert.create({
        title: 'Oops',
        message: e
      }).present();
    }
  }
}
