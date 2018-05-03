import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import {ComponentsModule} from "../../components/components.module";
import {AngularFireAuthModule} from "angularfire2/auth";

@NgModule({
  declarations: [
    SignUpPage
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    AngularFireAuthModule,
    ComponentsModule
  ],
})
export class RegisterPageModule {}
