import {Component, EventEmitter, Output} from '@angular/core';
import {Account} from '../../models/account/account.interface';
import {AuthProvider} from "../../providers/auth/auth";
import {LoginResponse} from "../../models/login/login-response.interface";

@Component({
  selector: 'sign-up-form',
  templateUrl: 'sign-up-form.html'
})
export class SignUpFormComponent {

  account = {
    email: '@macalester.edu'
  } as Account;

  @Output() signUpStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthProvider) {
    this.signUpStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try {
      const result = await this.auth
        .createUserWithEmailAndPassword(this.account);
      this.signUpStatus.emit(result)
    }
    catch (e) {
      this.signUpStatus.emit(e);
    }
  }
}
