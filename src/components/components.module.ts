import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
import { OfficeHourListComponent } from './office-hour-list/office-hour-list';
import {CourseListComponent} from "./course-list/course-list";

@NgModule({
	declarations: [StudentQueueComponent,
<<<<<<< HEAD
    OfficeHourListComponent,
  CourseListComponent],
	imports: [],
	exports: [StudentQueueComponent,
    OfficeHourListComponent,
  CourseListComponent]
=======
    CourseListComponent,
    OfficeHourListComponent ],
	imports: [],
	exports: [StudentQueueComponent,
    CourseListComponent,
    OfficeHourListComponent ]
>>>>>>> 6c6181a6f046537de926175585d5ebfe3a8be261
})
export class ComponentsModule {}
