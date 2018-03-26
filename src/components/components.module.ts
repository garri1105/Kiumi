import { NgModule } from '@angular/core';
import {CourseListComponent} from "./course-list/course-list";
import {SignUpFormComponent} from "./sign-up-form/sign-up-form";
import {LoginFormComponent} from "./login-form/login-form";
import { CourseSearchComponent } from './course-search/course-search';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileViewComponent } from './profile-view/profile-view';
import { EditHoursComponent } from "./edit-hours-form/edit-hours-form";
import { StudentQueueComponent } from './student-queue/student-queue';

@NgModule({
	declarations: [CourseListComponent,
    LoginFormComponent,
    SignUpFormComponent,
    CourseSearchComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    EditHoursComponent,
    StudentQueueComponent],
	imports: [],
	exports: [CourseListComponent,
    LoginFormComponent,
    SignUpFormComponent,
    CourseSearchComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    EditHoursComponent,
    StudentQueueComponent]
})
export class ComponentsModule {}
