import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassQueuePage } from './class-queue';
import {StudentQueueComponent} from "../../components/student-queue/student-queue";

@NgModule({
  declarations: [
    ClassQueuePage,
    StudentQueueComponent
  ],
  imports: [
    IonicPageModule.forChild(ClassQueuePage),
  ],
})
export class ClassQueuePageModule {}
