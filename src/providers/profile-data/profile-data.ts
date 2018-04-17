import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile/profile.interface";
import {take} from "rxjs/operators";

@Injectable()
export class ProfileDataProvider {

  private profileObject: AngularFireObject<Profile>;
  private profileList: AngularFireList<Profile> = this.database.list<Profile>('profiles');
  private profile: Profile;
  private user: User;

  constructor(private database: AngularFireDatabase) {

  }

  getProfileById(userId: string) {
    this.profileObject = this.database.object(`/profiles/${userId}`);
    return this.profileObject.valueChanges();
  }

  getProfileListRef() {
    return this.profileList;
  }

  updateProfile(profile: Profile) {
    return this.profileList.update(profile.key, profile);
  }

  getProfileRef(user: User) {
    this.user = user;
    if (user) {
      this.profileObject = this.database.object(`/profiles/${user.uid}`);
      return this.profileObject.valueChanges();
    }
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

  async loadProfile(user: User) {
    let profile$ = this.getProfileRef(user);
    if (profile$) {
      profile$.pipe(take(1)).subscribe(profile => {
        console.log('Second subscription. Profile Data. Getting Profile');
        this.profile = profile;
      });
    }

    return profile$;
  }

  getProfile() {
    if (this.profile) {
      return this.profile;
    }
    else if (this.getProfileRef(this.user)) {
      return null;
    }
    else {
      console.log('Error loading profile');
      return {} as Profile;
    }
  }
}
