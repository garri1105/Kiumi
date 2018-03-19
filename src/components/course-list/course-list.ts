import {Component, Injectable, Input} from '@angular/core';
import {Course} from "../../models/course/course.interface"
import {Profile} from "../../models/profile/profile.interface";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";

/**
 * Generated class for the CourseListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Injectable()
@Component({
  selector: 'course-list',
  templateUrl: 'course-list.html'
})

export class CourseListComponent {

  profile: Profile;
  studentButton: Boolean;
  instructorButton: Boolean;
  @Input() courseList: Course[];

  constructor(private globalProfile: GlobalProfileProvider) {
    this.profile = this.globalProfile.getProfile();
    this.studentButton = false;
    this.instructorButton = false;
  }

  toggleSection(event) {
    if (event.target.name === 'student') {
      this.studentButton = !this.studentButton;
    }
    else if (event.target.name === 'instructor') {
      this.instructorButton = !this.instructorButton;
    }
  }
}
