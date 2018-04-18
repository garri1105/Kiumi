import {Component} from '@angular/core';
import {IonicPage, LoadingController} from 'ionic-angular';
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {Course} from "../../models/course/course.interface";
import {Profile} from "../../models/profile/profile.interface";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {ProfileDataProvider} from "../../providers/profile-data/profile-data";
import {Subscription} from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-student-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {

  courseList: Course[];
  courseList$: Subscription;
  profile: Profile;
  ready: boolean;

  constructor(private courseData: CourseDataProvider,
              private profileData: ProfileDataProvider,
              private loading: LoadingController,
              private utilities: UtilitiesProvider) {

    this.resetDatabase(false);
  }

  ionViewCanEnter() {
    return this.courseList;
  }

  ionViewWillEnter() {
    console.log('Entering courses page');

    this.courseList = [];
    this.profile = this.profileData.getProfile();
    this.courseList$ = this.courseData
      .getCourseListRef()
      .valueChanges().subscribe(courses => {
        this.loadCourses(courses);
      });
  }

  ionViewWillLeave() {
    console.log('Leaving courses page');
    this.ready = false;
    this.courseList$.unsubscribe();
  }

  loadCourses(courses: Course[]) {
    this.courseList = courses.filter(course =>
          ((this.profile.instructor && this.profile.instructor.courses.indexOf(course.key) > -1) ||
      (this.profile.student && this.profile.student.courses.indexOf(course.key)) > -1));
    this.ready = true;
  }


  resetDatabase(active) {
    if (active) {
      let deleter = this.loading.create({
        content: 'Reseting database...'
      });
      deleter.present();
      this.utilities.resetDatabase().then(() => {
        deleter.dismiss();
      });
    }
  }

}
