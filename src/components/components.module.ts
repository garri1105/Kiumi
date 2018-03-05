import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
import { OfficeHourListComponent } from './office-hour-list/office-hour-list';
import {CourseListComponent} from "./course-list/course-list";

@NgModule({
	declarations: [StudentQueueComponent,
    OfficeHourListComponent,
  CourseListComponent],
	imports: [],
	exports: [StudentQueueComponent,
    OfficeHourListComponent,
  CourseListComponent]
})
export class ComponentsModule {}
