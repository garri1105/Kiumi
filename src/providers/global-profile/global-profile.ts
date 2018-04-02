import { Injectable } from "@angular/core";
import {AuthProvider} from "../auth/auth";
import {ProfileDataProvider} from "../profile-data/profile-data";
import {Profile} from "../../models/profile/profile.interface";

@Injectable()
export class GlobalProfileProvider {

  private profile: Profile;

  constructor(private auth: AuthProvider,
              private profileData: ProfileDataProvider) {
  }

  loadProfile() {
    return new Promise((resolve, reject) => {
      let user$ = this.auth.getAuthenticatedUser();
        if (user$) {
          user$.subscribe(user => {
            let profile$ = this.profileData.getProfile(user);
            if (profile$) {
              profile$.subscribe(profile => {
                  profile.valueChanges()
                    .subscribe(value => {
                        this.profile = value;
                        resolve(this.profile);
                      }
                    );
                });
            }
            else {
              reject("Profile doesn't exist");
            }
          })
        }
        else {
          reject("User not logged in");
        }
    });
  }

  getProfile() {
    return this.profile;
  }
}


