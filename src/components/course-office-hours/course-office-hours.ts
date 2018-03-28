import {Component, Input} from '@angular/core';

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

  @Input() courseKey: string;

  constructor() {
  }

}
