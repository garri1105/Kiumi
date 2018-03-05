import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
import { OfficeHourListComponent } from './office-hour-list/office-hour-list';
import {CourseListComponent} from "./course-list/course-list";

@NgModule({
	declarations: [StudentQueueComponent,
    CourseListComponent,
    OfficeHourListComponent ],
	imports: [],
	exports: [StudentQueueComponent,
    CourseListComponent,
    OfficeHourListComponent ]
})
export class ComponentsModule {}
