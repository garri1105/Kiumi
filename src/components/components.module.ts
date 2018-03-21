import { NgModule } from '@angular/core';
import {CourseListComponent} from "./course-list/course-list";
import {RegisterFormComponent} from "./register-form/register-form";
import {LoginFormComponent} from "./login-form/login-form";
import { CourseSearchComponent } from './course-search/course-search';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileViewComponent } from './profile-view/profile-view';
<<<<<<< HEAD
import { EditHoursComponent } from './edit-hours-form/edit-hours-form';
=======
import { EditHoursComponent } from "./edit-hours-form/edit-hours-form";
>>>>>>> 287bbad38a5f7d1bfe98fb48fce08255be10826a

@NgModule({
	declarations: [CourseListComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CourseSearchComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    EditHoursComponent],
	imports: [],
	exports: [CourseListComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CourseSearchComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    EditHoursComponent]
})
export class ComponentsModule {}
