import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditHoursPage } from './edit-hours';
import {EditHoursComponent} from "../../components/edit-hours-form/edit-hours-form";

@NgModule({
  declarations: [
    EditHoursPage,
    EditHoursComponent
  ],
  imports: [
    IonicPageModule.forChild(EditHoursPage),
  ],
})
export class EditHoursPageModule {}
