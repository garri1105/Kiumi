import { Component } from '@angular/core';

/**
 * Generated class for the OfficeHourListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'office-hour-list',
  templateUrl: 'office-hour-list.html'
})
export class OfficeHourListComponent {

  text: string;

  constructor() {
    console.log('Hello OfficeHourListComponent Component');
    this.text = 'Hello World';
  }

}
