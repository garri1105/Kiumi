import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentQueuePage } from './student-queue';
import {QueueForStudentsComponent} from "../../components/queue-for-students/queue-for-students";
import {QueueForInstructorsComponent} from "../../components/queue-for-instructors/queue-for-instructors";

@NgModule({
  declarations: [
    StudentQueuePage,
    QueueForStudentsComponent,
    QueueForInstructorsComponent
  ],
  imports: [
    IonicPageModule.forChild(StudentQueuePage),
  ],
})
export class StudentQueuePageModule {}
