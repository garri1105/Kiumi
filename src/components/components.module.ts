import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
import {CourseListComponent} from "./course-list/course-list";

@NgModule({
	declarations: [StudentQueueComponent,
  CourseListComponent],
	imports: [],
	exports: [StudentQueueComponent,
  CourseListComponent]
})
export class ComponentsModule {}
