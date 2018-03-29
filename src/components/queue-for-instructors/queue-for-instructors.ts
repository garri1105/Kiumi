import { Component } from '@angular/core';

/**
 * Generated class for the QueueForInstructorsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'queue-for-instructors',
  templateUrl: 'queue-for-instructors.html'
})
export class QueueForInstructorsComponent {

  text: string;

  constructor() {
    console.log('Hello QueueForInstructorsComponent Component');
    this.text = 'Hello World';
  }

}
