import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
import { OfficeHourListComponent } from './office-hour-list/office-hour-list';

@NgModule({
	declarations: [StudentQueueComponent,
    OfficeHourListComponent],
	imports: [],
	exports: [StudentQueueComponent,
    OfficeHourListComponent]
})
export class ComponentsModule {}
