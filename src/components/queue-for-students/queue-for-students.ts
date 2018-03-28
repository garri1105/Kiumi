import { Component } from '@angular/core';

/**
 * Generated class for the QueueForStudentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'queue-for-students',
  templateUrl: 'queue-for-students.html'
})
export class QueueForStudentsComponent {

  text: string;

  constructor() {
    console.log('Hello QueueForStudentsComponent Component');
    this.text = 'Hello World';
  }

}
