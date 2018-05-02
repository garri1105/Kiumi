import {Component, EventEmitter, Output} from '@angular/core';
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {AuthProvider} from "../../providers/auth/auth";
import {User} from "firebase/app";
import {Instructor} from "../../models/instructor/instructor.interface";
import {Student} from "../../models/student/student.interface";
import {AlertController} from "ionic-angular";
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {Course} from "../../models/course/course.interface";
import {take} from "rxjs/operators";

@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent {

  user: User;
  profile: Profile;
  @Output() saveProfileResult: EventEmitter<Boolean>;
  instructorCheck: boolean;
  studentCheck: boolean;

  constructor(private profileData: ProfileDataProvider,
              private courseData: CourseDataProvider,
              private auth: AuthProvider,
              private alert: AlertController) {

    this.profile = this.profileData.getProfile();

    if (this.profile) {
      this.instructorCheck = !!this.profile.instructor;
      this.studentCheck = !!this.profile.student;
    }
    else {
      this.profile = {} as Profile;
      this.instructorCheck = false;
      this.studentCheck = false;
    }

    this.saveProfileResult = new EventEmitter<Boolean>();

    this.auth.getAuthenticatedUser().pipe(take(1))
      .subscribe(user => {
        this.user = user;
        console.log(user);
        if (!this.profile.name && this.user.displayName) {
          this.profile.name = this.user.displayName;
        }

        if (!this.profile.avatarURL) {
          if (this.user.photoURL) {
            this.profile.avatarURL = this.user.photoURL;
          }
          else {
            this.profile.avatarURL = 'assets/imgs/googleDefaultProfile.jpg'
          }
        }

      });
  }

  // This function saves a user's roles as an instructor and/or student. 
  saveProfile() {
    if (this.instructorCheck) {
      if (!this.profile.instructor) {
        this.profile.instructor = <Instructor> {
          courses: ['0'],
          officeHours: ['0']
        };
      }
    }
    else {
      if (this.profile.instructor) {
        this.profile.instructor.courses
          .map(courseKey =>
            this.courseData
              .getCourseByKey(courseKey)
              .subscribe((course: Course) => {
                if (course) {
                  let index = course.instructors.indexOf(this.profile.key);
                  if (index > -1){
                    course.instructors.splice(index, 1);
                  }

                  this.courseData.updateCourse(course);
                }
              })
          );
      }

      this.profile.instructor = null;
    }

    if (this.studentCheck) {
      if (!this.profile.student) {
        this.profile.student = <Student> {
          courses: ['0']
        };
      }
    }
    else {
      if (this.profile.student) {
        this.profile.student.courses
          .map(courseKey =>
            this.courseData
              .getCourseByKey(courseKey)
              .subscribe((course: Course) => {
                if (course) {
                  let index = course.students.indexOf(this.profile.key);
                  if (index > -1) {
                    course.students.splice(index, 1);
                  }
                  this.courseData.updateCourse(course);
                }
              })
          );

        this.profile.student = null;
      }
    }

    if (this.user) {
      this.profileData.saveProfile(this.user, this.profile)
        .then(value => this.saveProfileResult.emit(value));

      this.profileData.loadProfile(this.user);
    }
  }

  // This function alerts a user when they uncheck the instructor or student checkbox. It assures that the user doesn't
  // accidentally remove their credential as an instructor or student. 
  alertUser(checkbox) {
    if (!checkbox.valueAccessor.value) {
      this.alert.create({
        title: 'Are you sure?',
        message: `Unchecking this box will delete your ${checkbox.name} information`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              checkbox.valueAccessor.value = true;
            }
          },
          {
            text: 'Continue',
          }
        ]
      }).present();
    }
  }
}
