import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
<<<<<<< HEAD
<<<<<<< HEAD
import { OfficeHourListComponent } from './office-hour-list/office-hour-list';

@NgModule({
	declarations: [StudentQueueComponent,
    OfficeHourListComponent],
	imports: [],
	exports: [StudentQueueComponent,
    OfficeHourListComponent]
=======
import { CourseListComponent } from './course-list/course-list';
=======
import { OfficeHourListComponent } from './office-hour-list/office-hour-list';
import {CourseListComponent} from "./course-list/course-list";
>>>>>>> b4ad1eb7e2d95dfa5747346e7d0b7c635cb26699

@NgModule({
	declarations: [StudentQueueComponent,
<<<<<<< HEAD
    OfficeHourListComponent,
  CourseListComponent],
	imports: [],
	exports: [StudentQueueComponent,
<<<<<<< HEAD
    CourseListComponent]
>>>>>>> e3a4a5387c14364ffda69629d588e8c361b9d38e
=======
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
>>>>>>> b4ad1eb7e2d95dfa5747346e7d0b7c635cb26699
})
export class ComponentsModule {}
