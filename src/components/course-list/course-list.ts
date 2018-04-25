import {Component, Injectable, Input} from '@angular/core';
import {Course} from "../../models/course/course.interface"
import {Profile} from "../../models/profile/profile.interface";
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Student} from "../../models/student/student.interface";
import {Instructor} from "../../models/instructor/instructor.interface";
import {Toast, ToastController} from "ionic-angular";

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
  errorToast: Toast;

  constructor(private courseData: CourseDataProvider,
              private profileData: ProfileDataProvider,
              private toast: ToastController) {

    this.profile = this.profileData.getProfile();
    this.studentButton = false;
    this.instructorButton = false;

    this.errorToast = this.toast.create({duration: 3000});
  }

  // This function takes in an event and then displays the courses that a user is attending and/or instructing. 
  // It uses the user's information to determine whether he or she is a student or instructor. 
  toggleSection(event) {
    if (event === 'student') {
      this.studentButton = !this.studentButton;
    }
    else if (event === 'instructor') {
      this.instructorButton = !this.instructorButton;
    }
  }

  // This function takes an either an Instructor or Student as well as a Course to be removed. 
  // It updates the user's profile and removes the class from their list of classes. 
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

        this.courseData.updateCourse(course)
          .catch(e => this.errorToast.setMessage(e).present());
      });

    this.profileData.updateProfile(this.profile)
      .catch(e => this.errorToast.setMessage(e).present());
  }

  // This function takes in an Instructor or Student and returns a boolean that represents whether or not the 
  // user is an instructor for the given office hours.  
  isInstructor(profile: Instructor | Student): profile is Instructor {
    return (<Instructor>profile).officeHours !== undefined;
  }

}
