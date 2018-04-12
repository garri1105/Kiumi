import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavParams} from 'ionic-angular';
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {Course} from "../../models/course/course.interface";
import {Profile} from "../../models/profile/profile.interface";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";

@IonicPage()
@Component({
  selector: 'page-student-courses',
  templateUrl: 'courses.html',
})
export class StudentCoursesPage {

  studentCourses: Course[];
  profile = {} as Profile;

  constructor(private navParams: NavParams,
              private courseData: CourseDataProvider,
              private profileData: ProfileDataProvider,
              private loading: LoadingController,
              private utilities: UtilitiesProvider) {

    // this.resetDatabase();
    this.loadCourses();
  }

  resetDatabase() {
    let deleter = this.loading.create({
      content: 'Reseting database...'
    });
    deleter.present();
    this.utilities.resetDatabase(false).then(() => {
      deleter.dismiss();
    });
  }

  loadCourses() {
    let loader = this.loading.create({
      content: 'Loading courses...'
    });

    this.profile = this.profileData.getProfile();
    loader.present();

    this.courseData
      .getCourseListRef()
      .valueChanges()
      .subscribe(courses => {
        this.studentCourses = courses.filter(course =>
              ((this.profile.instructor && this.profile.instructor.courses.indexOf(course.key) > -1) ||
          (this.profile.student && this.profile.student.courses.indexOf(course.key)) > -1));
        loader.dismiss();
      });
  }
}
