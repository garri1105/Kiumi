import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeHoursPage } from './office-hours';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    OfficeHoursPage
  ],
  imports: [
    IonicPageModule.forChild(OfficeHoursPage),
    ComponentsModule
  ],
})
export class OfficeHoursPageModule {}
