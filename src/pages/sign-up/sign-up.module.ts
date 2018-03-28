import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import {SignUpFormComponent} from "../../components/sign-up-form/sign-up-form";
import {AngularFireAuthModule} from "angularfire2/auth";

@NgModule({
  declarations: [
    SignUpPage,
    SignUpFormComponent
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    AngularFireAuthModule
  ],
})
export class RegisterPageModule {}
