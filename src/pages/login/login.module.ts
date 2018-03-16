import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {LoginFormComponent} from "../../components/login-form/login-form";
import {AngularFireAuthModule} from "angularfire2/auth";

@NgModule({
  declarations: [
    LoginPage,
    LoginFormComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    AngularFireAuthModule
  ],
})
export class LoginPageModule {}
