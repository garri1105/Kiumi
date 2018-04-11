import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile/profile.interface";
import {take} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class ProfileDataProvider {

  private profileObject: AngularFireObject<Profile>;
  private profileList: AngularFireList<Profile> = this.database.list<Profile>('profiles');

  constructor(private database: AngularFireDatabase) {
  }

  getProfileList() {
    return this.profileList;
  }

  async updateProfile(profile: Profile) {
    return await this.profileList.update(profile.key, profile);
  }

  getProfile(user: User) {
    console.log(user.email);
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    console.log(this.profileObject);

    return of(this.profileObject).pipe(take(1));
  }

  removeProfile(profile: Profile) {
    this.profileList.remove(profile.key);
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
}
