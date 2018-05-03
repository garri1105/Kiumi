import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentQueuePage } from './student-queue';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    StudentQueuePage
  ],
  imports: [
    IonicPageModule.forChild(StudentQueuePage),
    ComponentsModule
  ],
})
export class StudentQueuePageModule {}
