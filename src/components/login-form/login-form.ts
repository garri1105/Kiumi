import {Component, EventEmitter, Output} from '@angular/core';
import { Account } from '../../models/account/account.interface';
import {LoginResponse} from "../../models/login/login-response.interface";
import {AuthProvider} from "../../providers/auth/auth";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  account = {
    email: '@macalester.edu'
  } as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;
  loginResult: LoginResponse;

  constructor(private auth: AuthProvider) {

    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  async googleLogin() {
    return this.auth.googleLogin();
  }

  async login() {
    this.loginResult = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(this.loginResult);
  }
}
