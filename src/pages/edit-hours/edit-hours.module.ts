import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditHoursPage } from './edit-hours';

@NgModule({
  declarations: [
    EditHoursPage,
  ],
  imports: [
    IonicPageModule.forChild(EditHoursPage),
  ],
})
export class EditHoursPageModule {}
