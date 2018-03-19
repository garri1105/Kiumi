import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {Course} from "../../models/course/course.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Profile} from "../../models/profile/profile.interface";
import {GlobalProfileProvider} from "../../providers/global-profile/global-profile";
import {CourseDataProvider} from "../../providers/course-data/course-data";

@IonicPage()
@Component({
  selector: 'page-add-courses',
  templateUrl: 'add-courses.html',
})
export class AddCoursesPage {

  addedCourses: Course[];
  profile: Profile;

  constructor(private globalProfile: GlobalProfileProvider,
              private toast: ToastController,
              private navCtrl: NavController,
              private profileData: ProfileDataProvider,
              private courseData: CourseDataProvider) {

    this.profile = this.globalProfile.getProfile();
  }

  saveCourses() {
    this.addedCourses.map(course => {
      course.selection = null;
      this.courseData.updateCourse(course);
    });

    this.profileData.updateProfile(this.profile);

    this.toast.create({
      message: 'Courses saved succesfully',
      duration: 3000
    }).present();

    this.navCtrl.setRoot('TabsPage');
  }

  getSelectedCourses(event: Course[]) {
    this.addedCourses = event;
  }
}
