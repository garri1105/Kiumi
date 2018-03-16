import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {RegisterFormComponent} from "../../components/register-form/register-form";
import {AngularFireAuthModule} from "angularfire2/auth";

@NgModule({
  declarations: [
    RegisterPage,
    RegisterFormComponent
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    AngularFireAuthModule
  ],
})
export class RegisterPageModule {}
