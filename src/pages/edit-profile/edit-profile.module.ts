import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import {EditProfileFormComponent} from "../../components/edit-profile-form/edit-profile-form";

@NgModule({
  declarations: [
    EditProfilePage,
    EditProfileFormComponent
  ],
  imports: [
    IonicPageModule.forChild(EditProfilePage),
  ],
})
export class EditProfilePageModule {}
