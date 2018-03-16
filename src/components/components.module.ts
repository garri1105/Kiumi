import { NgModule } from '@angular/core';
import { StudentQueueComponent } from './student-queue/student-queue';
import {CourseListComponent} from "./course-list/course-list";
import {RegisterFormComponent} from "./register-form/register-form";
import {LoginFormComponent} from "./login-form/login-form";

@NgModule({
	declarations: [StudentQueueComponent,
    CourseListComponent,
    LoginFormComponent,
    RegisterFormComponent],
	imports: [],
	exports: [StudentQueueComponent,
    CourseListComponent,
    LoginFormComponent,
    RegisterFormComponent]
})
export class ComponentsModule {}
