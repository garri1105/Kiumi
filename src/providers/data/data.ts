import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile/profile.interface";
import {take} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class DataProvider {

  profileObject: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>;

  constructor(private database: AngularFireDatabase) {
  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    return of(this.profileObject).pipe(take(1));
  }

  searchUser(firstName: string) {
    const query = this.database.list<Profile>('/profiles', ref =>
      ref.orderByChild('firstName').equalTo(firstName));

    return of(query).pipe(take(1));
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
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
