import { NgModule } from '@angular/core';
import {CourseListComponent} from "./course-list/course-list";
import {SignUpFormComponent} from "./sign-up-form/sign-up-form";
import {LoginFormComponent} from "./login-form/login-form";
import { CourseSearchComponent } from './course-search/course-search';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileViewComponent } from './profile-view/profile-view';
import { EditHoursFormComponent } from "./edit-hours-form/edit-hours-form";
import { OfficeHoursListComponent } from './office-hours-list/office-hours-list';
import { QueueForStudentsComponent } from './queue-for-students/queue-for-students';
import { QueueForInstructorsComponent } from './queue-for-instructors/queue-for-instructors';

@NgModule({
	declarations: [CourseListComponent,
    LoginFormComponent,
    SignUpFormComponent,
    CourseSearchComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    EditHoursFormComponent,
    OfficeHoursListComponent,
    QueueForStudentsComponent,
    QueueForInstructorsComponent],
	imports: [],
	exports: [CourseListComponent,
    LoginFormComponent,
    SignUpFormComponent,
    CourseSearchComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    EditHoursFormComponent,
    OfficeHoursListComponent,
    QueueForStudentsComponent,
    QueueForInstructorsComponent]
})
export class ComponentsModule {}
