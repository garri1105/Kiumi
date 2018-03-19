import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCoursesPage } from './add-courses';
import {CourseSearchComponent} from "../../components/course-search/course-search";

@NgModule({
  declarations: [
    AddCoursesPage,
    CourseSearchComponent
  ],
  imports: [
    IonicPageModule.forChild(AddCoursesPage),
  ],
})
export class AddCoursesPageModule {}
