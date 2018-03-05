import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
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

@NgModule({
	declarations: [StudentQueueComponent,
    CourseListComponent],
	imports: [],
	exports: [StudentQueueComponent,
    CourseListComponent]
>>>>>>> e3a4a5387c14364ffda69629d588e8c361b9d38e
})
export class ComponentsModule {}
