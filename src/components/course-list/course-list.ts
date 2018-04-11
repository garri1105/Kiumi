import {Component, Injectable, Input} from '@angular/core';
import {Course} from "../../models/course/course.interface"
import {Profile} from "../../models/profile/profile.interface";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {take} from "rxjs/operators";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Student} from "../../models/student/student.interface";
import {Instructor} from "../../models/instructor/instructor.interface";

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
    if (event === 'student') {
      this.studentButton = !this.studentButton;
    }
    else if (event === 'instructor') {
      this.instructorButton = !this.instructorButton;
    }
  }

  removeCourse(profile: Instructor | Student, course: Course) {
    profile.courses.splice(profile.courses.indexOf(course.key), 1);

    this.courseData.getCourseByKey(course.key)
      .subscribe((course: Course) => {
        if (this.isInstructor(profile)) {
          course.instructors.splice(course.instructors.indexOf(this.profile.key), 1);
        }
        else {
          course.students.splice(course.students.indexOf(this.profile.key), 1);
        }

        this.courseData.updateCourse(course);
      });
    this.profileData.updateProfile(this.profile);
  }

  isInstructor(profile: Instructor | Student): profile is Instructor {
    return (<Instructor>profile).officeHours !== undefined;
  }

}
