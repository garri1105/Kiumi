import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassQueuePage } from './class-queue';
import {CourseOfficeHoursComponent} from "../../components/course-office-hours/course-office-hours";

@NgModule({
  declarations: [
    ClassQueuePage,
    CourseOfficeHoursComponent
  ],
  imports: [
    IonicPageModule.forChild(ClassQueuePage),
  ],
})
export class ClassQueuePageModule {}
