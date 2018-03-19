import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import { Course } from '../../models/course/course.interface';

@IonicPage()
@Component({
  selector: 'page-class-queue',
  templateUrl: 'class-queue.html'
})
export class ClassQueuePage {
  course: Course;

  constructor(private navParams: NavParams)  {
      this.course = this.navParams.get('course');
  }
}
