import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Course } from '../../models/course/course.interface';
import {OfficeHours} from "../../models/office-hours/office-hours.interface";
import {Profile} from "../../models/profile/profile.interface";

@Injectable()
export class StudentQueueDataProvider {
  studentQueue$: AngularFireObject<string[]>;

  constructor(private db: AngularFireDatabase) {

  }

  getStudentQueueRef(officeHours: OfficeHours, course: Course) {
    this.studentQueue$ = this.db.object(`course-list/${course.key}/officeHours/${officeHours.key}/studentQueue`);
    return this.studentQueue$;
  }

  updateQueue(profiles: Profile[]) {
    let studentQueue = profiles.map(profile => {
      return profile.key;
    });

    return this.studentQueue$.set(studentQueue);
  }
}





