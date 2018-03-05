import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CourseListComponent} from "../components/course-list/course-list";

@NgModule({
  imports: [IonicPageModule.forChild(CourseListComponent)],
  declarations: [CourseListComponent],
  exports: [CourseListComponent]
}) export class SharedModule {}
