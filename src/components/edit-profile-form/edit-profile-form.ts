import {Component, EventEmitter, Output} from '@angular/core';
import {Profile} from "../../models/profile/profile.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {AuthProvider} from "../../providers/auth/auth";
import {User} from "firebase/app";
import {Instructor} from "../../models/instructor/instructor.interface";
import {Student} from "../../models/student/student.interface";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";

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
              private auth: AuthProvider,
              private globalProfile: GlobalProfileProvider) {

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
      this.profile.instructor = <Instructor> {
        courses: ['0'],
        officeHours: ['0']
      };
    }

    if (this.studentCheck) {
      this.profile.student = <Student> {
        courses: ['0']
      };
    }

    if (this.authenticatedUser) {
      this.profileData.saveProfile(this.authenticatedUser, this.profile)
        .then(value => this.saveProfileResult.emit(value));
    }
  }

  ngOnInit() {
    if (!this.profile) {
      this.profile = {} as Profile;
    }
  }
}
