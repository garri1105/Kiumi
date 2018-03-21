import {Component, EventEmitter, Output} from '@angular/core';
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {AuthProvider} from "../../providers/auth/auth";
import {User} from "firebase/app";
import {Instructor} from "../../models/instructor/instructor.interface";
import {Student} from "../../models/student/student.interface";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {AlertController} from "ionic-angular";
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {Course} from "../../models/course/course.interface";

@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent {

  authenticatedUser: User;
  profile: Profile;
  @Output() saveProfileResult: EventEmitter<Boolean>;
  instructorCheck: boolean;
  studentCheck: boolean;

  constructor(private profileData: ProfileDataProvider,
              private courseData: CourseDataProvider,
              private auth: AuthProvider,
              private globalProfile: GlobalProfileProvider,
              private alert: AlertController) {

    this.profile = this.globalProfile.getProfile();

    if (this.profile) {
      this.instructorCheck = !!this.profile.instructor;
      this.studentCheck = !!this.profile.student;
    }
    else {
      this.instructorCheck = false;
      this.studentCheck = false;
    }

    this.saveProfileResult = new EventEmitter<Boolean>();

    this.auth.getAuthenticatedUser()
      .subscribe(user => this.authenticatedUser = user);
  }

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
              .valueChanges()
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
              .valueChanges()
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

    if (this.authenticatedUser) {
      this.profileData.saveProfile(this.authenticatedUser, this.profile)
        .then(value => this.saveProfileResult.emit(value));
    }
  }

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
              checkbox.valueAccessor.writeValue(true);
            }
          },
          {
            text: 'Continue',
          }
        ]
      }).present();
    }
  }

  ngOnInit() {
    if (!this.profile) {
      this.profile = {} as Profile;
    }
  }
}
