import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile/profile.interface";
import {take} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {AuthProvider} from "../auth/auth";

@Injectable()
export class ProfileDataProvider {

  private profileObject: AngularFireObject<Profile>;
  private profileList: AngularFireList<Profile> = this.database.list<Profile>('profiles');
  private profile: Profile;

  constructor(private database: AngularFireDatabase,
              private auth: AuthProvider) {
  }

  getProfileListRef() {
    return this.profileList;
  }

  updateProfile(profile: Profile) {
    return this.profileList.update(profile.key, profile);
  }

  getProfileRef(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    return of(this.profileObject).pipe(take(1));
  }

  removeProfile(profile: Profile) {
    return this.profileList.remove(profile.key);
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    profile.key = user.uid;

    try {
      await this.profileObject.set(profile);
      return true;
    }
    catch(e) {
      console.error(e);
      return false;
    }
  }

  async loadProfile() {
    return new Promise((resolve, reject) => {
      let user$ = this.auth.getAuthenticatedUser();
      if (user$) {
        user$.subscribe(user => {
          console.log('user loadProfile accessed');
          let profile$ = this.getProfileRef(user);
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
