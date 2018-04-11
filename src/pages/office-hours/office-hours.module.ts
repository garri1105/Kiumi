import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeHoursPage } from './office-hours';
import {OfficeHoursListComponent} from "../../components/office-hours-list/office-hours-list";

@NgModule({
  declarations: [
    OfficeHoursPage,
    OfficeHoursListComponent
  ],
  imports: [
    IonicPageModule.forChild(OfficeHoursPage),
  ],
})
export class OfficeHoursPageModule {}
