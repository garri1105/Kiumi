import {Component, EventEmitter, Output} from '@angular/core';
import { Account } from '../../models/account/account.interface';
import {LoginResponse} from "../../models/login/login-response.interface";
import {AuthProvider} from "../../providers/auth/auth";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  account = {
    email: '@macalester.edu'
  } as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthProvider,
              private globalProfile: GlobalProfileProvider) {

    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  async googleLogin() {
    this.auth.googleLogin();
  }

  async login() {
    const result = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(result);
    if (!result.error) {
      await this.globalProfile.loadProfile();
    }
  }
}
