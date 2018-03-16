import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { COURSE_LIST } from '../../mocks/course.mocks';
import { Course } from '../../models/course/course.interface';


/**
 * Generated class for the ClassesOfPreceptorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-classes-of-preceptor',
  templateUrl: 'classes-of-preceptor.html',
})
export class ClassesOfPreceptorPage {
  courseList: Course[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.courseList = COURSE_LIST;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassesOfPreceptorPage');
  }

}
