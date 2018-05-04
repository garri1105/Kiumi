import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditHoursPage } from './edit-hours';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    EditHoursPage
  ],
  imports: [
    IonicPageModule.forChild(EditHoursPage),
    ComponentsModule
  ],
})
export class EditHoursPageModule {}
