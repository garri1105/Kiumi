import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesPage } from './courses';
import {CourseListComponent} from "../../components/course-list/course-list";

@NgModule({
  declarations: [
    CoursesPage,
    CourseListComponent
  ],
  imports: [
    IonicPageModule.forChild(CoursesPage),
  ],
})
export class CoursesPageModule {}
