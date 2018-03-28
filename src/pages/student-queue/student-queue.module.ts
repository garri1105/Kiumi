import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentQueuePage } from './student-queue';
import {QueueForStudentsComponent} from "../../components/queue-for-students/queue-for-students";

@NgModule({
  declarations: [
    StudentQueuePage,
    QueueForStudentsComponent
  ],
  imports: [
    IonicPageModule.forChild(StudentQueuePage),
  ],
})
export class StudentQueuePageModule {}
