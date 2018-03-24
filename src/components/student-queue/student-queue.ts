import { Component } from '@angular/core';

/**
 * Generated class for the StudentQueueComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'student-queue',
  templateUrl: 'student-queue.html'
})
export class StudentQueueComponent {

  text: string;

  constructor() {
    console.log('Hello StudentQueueComponent Component');
    this.text = 'Hello World';
  }

}
