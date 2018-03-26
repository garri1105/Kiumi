import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello CourseOfficeHoursComponent Component');
    this.text = 'Hello World';
  }

}
