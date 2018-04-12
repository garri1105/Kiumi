import {Component, EventEmitter, Output} from '@angular/core';
import {Profile} from "../../models/profile/profile.interface";
import {AuthProvider} from "../../providers/auth/auth";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent {

  profile: Profile;
  @Output() signOutResult: EventEmitter<Promise<any>>;

  constructor(private profileData: ProfileDataProvider,
              private auth: AuthProvider) {

    this.profile = this.profileData.getProfile();
    this.signOutResult = new EventEmitter<Promise<any>>();
  }

  signOut() {
      this.signOutResult.emit(this.auth.signOut());
  }
}
