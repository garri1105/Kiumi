import {Component, Input} from '@angular/core';
import { Course } from '../../models/course/course.interface';

/**
 * Generated class for the CourseOfficeHoursComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'course-office-hours',
  templateUrl: 'course-office-hours.html'
})
export class CourseOfficeHoursComponent {

  @Input() course: Course;

  constructor() {
  }

  officeHoursExist(course: Course) {
    if(course.officeHours.length > 1) {
      return true;
    }
    else {
      return false;
    }
  }

}
