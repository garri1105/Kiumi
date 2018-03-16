import {Component, EventEmitter, Output} from '@angular/core';
import {NavController} from "ionic-angular";
import { Account } from '../../models/account/account.interface';
import {LoginResponse} from "../../models/login/login-response.interface";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  account = {} as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(private navCtrl: NavController,
              private auth: AuthProvider) {

    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  async login() {
    const result = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(result);
  }
}
