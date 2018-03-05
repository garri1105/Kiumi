import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentCoursesPage } from './student-courses';
import {CourseListComponent} from "../../components/course-list/course-list";

@NgModule({
  declarations: [
    StudentCoursesPage,
    CourseListComponent
  ],
  imports: [
    IonicPageModule.forChild(StudentCoursesPage),
  ],
})
export class StudentCoursesPageModule {}
