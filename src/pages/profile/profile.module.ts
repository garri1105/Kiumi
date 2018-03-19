import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import {ProfileViewComponent} from "../../components/profile-view/profile-view";

@NgModule({
  declarations: [
    ProfilePage,
    ProfileViewComponent
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
