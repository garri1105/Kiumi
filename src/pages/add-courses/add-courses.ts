import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {Course} from "../../models/course/course.interface";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Profile} from "../../models/profile/profile.interface";
import {CourseDataProvider} from "../../providers/course-data/course-data";

@IonicPage()
@Component({
  selector: 'page-add-courses',
  templateUrl: 'add-courses.html',
})
export class AddCoursesPage {

  addedCourses: Course[];
  profile: Profile;

  constructor(private toast: ToastController,
              private navCtrl: NavController,
              private profileData: ProfileDataProvider,
              private courseData: CourseDataProvider) {

    this.profile = this.profileData.getProfile();
  }

  // This saveCourses function takes in no inputs and saves a student or instructor's courses. It interacts with 
  // the database and adds courses to the user's profile. 
  saveCourses() {
    if (this.addedCourses) {
      this.addedCourses.map(course => {
        if (course.selection === 'Instructor') {
          this.profile.instructor.courses.push(course.key);
          course.instructors.push(this.profile.key);
        }
        else {
          this.profile.student.courses.push(course.key);
          course.students.push(this.profile.key);
        }
        course.selection = null;
        this.courseData.updateCourse(course);
      });

      this.profileData.updateProfile(this.profile);

      this.toast.create({
        message: 'Courses saved succesfully',
        duration: 1000
      }).present();

      this.navCtrl.setRoot('TabsPage');
    }
    else {
      this.toast.create({
        message: 'No courses to be saved',
        duration: 3000
      }).present();
    }
  }

  // This getSelectedCourses function takes in an array of courses and gets the courses that are selected
  // by updating the variable addedCourses to be the array of courses that is passed as an input. 
  getSelectedCourses(event: Course[]) {
    this.addedCourses = event;
  }
}
