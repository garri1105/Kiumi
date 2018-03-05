import {Component, Injectable, Input} from '@angular/core';
import {Course} from "../../models/course.interface"

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
  @Input() courses: Course[];
  @Input() nextPage: string;

  ngOnInit() {
  }
}
