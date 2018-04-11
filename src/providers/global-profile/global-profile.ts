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

  async loadProfile() {
    return new Promise((resolve, reject) => {
      let user$ = this.auth.getAuthenticatedUser();
      if (user$) {
        user$.subscribe(user => {
          console.log('user loadProfile accessed');
          let profile$ = this.profileData.getProfile(user);
          if (profile$) {
            profile$.subscribe(profile => {
              profile.valueChanges()
                .subscribe(value => {
                  console.log('loadProfile accessed');
                  this.profile = value;
                  resolve(this.profile);
                });
            });
          }
          else {
            console.log("Profile doesn't exist");
            reject("Profile doesn't exist");
          }
        })
      }
      else {
        console.log("");
        reject("User not logged in");
      }
    });
  }

  getProfile() {
    if (this.profile) {
      return this.profile;
    }
    else {
      console.log('Error loading profile');
      return this.loadProfile()
        .then(() => {
          return this.getProfile()
        })
        .catch(e => {
          this.auth.signOut();
        });
    }
  }
}


