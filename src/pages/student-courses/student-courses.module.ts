import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentCoursesPage } from './student-courses';
import {SharedModule} from "../shared.module";

@NgModule({
  declarations: [
    StudentCoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentCoursesPage),
    SharedModule
  ],
})
export class StudentCoursesPageModule {}
