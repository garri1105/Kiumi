import { Component } from '@angular/core';

/**
 * Generated class for the EditHoursComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-hours-form',
  templateUrl: 'edit-hours-form.html'
})
export class EditHoursComponent {

  text: string;

  constructor() {
    console.log('Hello EditHoursComponent Component');
    this.text = 'Hello World';
  }

}
