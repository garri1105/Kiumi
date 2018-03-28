import {Component, EventEmitter, Output} from '@angular/core';
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {Profile} from "../../models/profile/profile.interface";
import {AuthProvider} from "../../providers/auth/auth";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent {

  profile: Profile;
  @Output() signOutResult: EventEmitter<Promise<any>>;

  constructor(private globalProfile: GlobalProfileProvider,
              private auth: AuthProvider) {
    this.profile = this.globalProfile.getProfile();
    this.signOutResult = new EventEmitter<Promise<any>>();
  }

  signOut() {
      this.signOutResult.emit(this.auth.signOut());
  }
}
