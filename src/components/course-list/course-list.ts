import {Component, Injectable, Input} from '@angular/core';
import {Course} from "../../models/course/course.interface"
import {Profile} from "../../models/profile/profile.interface";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {take} from "rxjs/operators";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";

@Injectable()
@Component({
  selector: 'course-list',
  templateUrl: 'course-list.html'
})

export class CourseListComponent {

  profile: Profile;
  studentButton: Boolean;
  instructorButton: Boolean;
  @Input() courseList: Course[];

  constructor(private globalProfile: GlobalProfileProvider,
              private courseData: CourseDataProvider,
              private profileData: ProfileDataProvider) {

    this.profile = this.globalProfile.getProfile();
    this.studentButton = false;
    this.instructorButton = false;
  }

  toggleSection(event) {
    if (event.target.name === 'student') {
      this.studentButton = !this.studentButton;
    }
    else if (event.target.name === 'instructor') {
      this.instructorButton = !this.instructorButton;
    }
  }

  removeCourse(event, course: Course) {
    if (event.target.name === 'studentCourse') {
      this.profile.student.courses.splice(this.profile.student.courses.indexOf(course.key), 1);
      this.courseData.getCourseByKey(course.key)
        .valueChanges().pipe(take(1))
        .subscribe((course: Course) => {
          course.students.splice(course.students.indexOf(this.profile.key), 1);
          this.courseData.updateCourse(course);
        });
      this.profileData.updateProfile(this.profile);
    }
    else if (event.target.name === 'instructorCourse') {
      this.profile.instructor.courses.splice(this.profile.instructor.courses.indexOf(course.key), 1);
      this.courseData.getCourseByKey(course.key)
        .valueChanges().pipe(take(1))
        .subscribe((course: Course) => {
          course.instructors.splice(course.instructors.indexOf(this.profile.key), 1);
          this.courseData.updateCourse(course);
        });
      this.profileData.updateProfile(this.profile);
    }
  }
}
