import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {StudentsService} from "../../services/students/students.service";
import {CoursesService} from "../../services/courses/courses.service";
import {Student} from "../../models/student.interface";
import {STUDENT_QUEUE} from "../../mocks/student.mocks";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
  }
}
