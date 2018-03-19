import { Component } from '@angular/core';
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent {

  profile: Profile;
  instructorStatus: string;
  studentStatus: string;

  constructor(private globalProfile: GlobalProfileProvider) {
    this.profile = this.globalProfile.getProfile();

    if (this.profile.instructor) {
      this.instructorStatus = 'Instructor';
    }

    if (this.profile.student) {
       this.studentStatus = 'Student';
    }
  }
}
