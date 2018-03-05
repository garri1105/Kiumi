import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassesOfPreceptorPage } from './classes-of-preceptor';
// import { CoursesService } from '../../services/courses/courses.service';
// import { StudentQueueComponent } from '../../components/student-queue/student-queue';
import { CourseListComponent } from '../../components/course-list/course-list';
import { COURSE_LIST } from '../../mocks/course.mocks';

@NgModule({
  declarations: [
    ClassesOfPreceptorPage,
    CourseListComponent
  ],
  imports: [
    IonicPageModule.forChild(ClassesOfPreceptorPage),
  ],
})
export class ClassesOfPreceptorPageModule {}
