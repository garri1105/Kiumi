import {Component, EventEmitter, Output} from '@angular/core';
import { Account } from '../../models/account/account.interface';
import {LoginResponse} from "../../models/login/login-response.interface";
import {AuthProvider} from "../../providers/auth/auth";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Profile} from "../../models/profile/profile.interface";

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  account = {
    email: '@macalester.edu'
  } as Account;

  profile: Profile;
  @Output() loginStatus: EventEmitter<LoginResponse>;
  loginResult: LoginResponse;

  constructor(private auth: AuthProvider,
              private profileData: ProfileDataProvider) {

    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  // This function allows for Google login with a Macalester email account. 
  async googleLogin() {
    const gUser: any = await this.auth.googleLogin();
    console.log(gUser);
    if (gUser && !gUser.additionalUserInfo.isNewUser) {
      await this.profileData.loadProfile(gUser.user);
      setTimeout(() => {
        this.profile = this.profileData.getProfile();
        this.profile.avatarURL = gUser.additionalUserInfo.profile.picture;
        this.profileData.updateProfile(this.profile);
      }, 100);
    }
  }

  // This function allows for login with an account that isn't stored through Google. 
  async login() {
    this.loginResult = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(this.loginResult);
  }
}
