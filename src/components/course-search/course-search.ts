import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "../../models/course/course.interface";
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {Profile} from "../../models/profile/profile.interface";


/**
 * Generated class for the CourseSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'course-search',
  templateUrl: 'course-search.html'
})
export class CourseSearchComponent {

  courseList: Course[];
  selectedCourses: Course[] = [];

  @Input() profile: Profile;
  @Output() addedCourses: EventEmitter<Course[]>;

  constructor(private courseData: CourseDataProvider) {
    this.addedCourses = new EventEmitter<Course[]>();
  }

  searchCourse(query: string) {
    this.courseList = this.selectedCourses;

    if (query.length > 0) {
      this.courseData.searchCourse(query)
        .subscribe(courses => courses.valueChanges()
          .subscribe(list => {
            this.courseList = this.courseList.concat(list);
          }));
    }
  }

  addCourse(course: Course) {
    if (course.selection !== null) {
      if (course.selection === 'Instructor') {
        this.profile.instructor.courses.push(course.key);
        course.instructors.push(this.profile.key);
      }
      else {
        this.profile.student.courses.push(course.key);
        course.students.push(this.profile.key);
      }

      this.selectedCourses.push(course);

      this.addedCourses.emit(this.selectedCourses);
    }
  }
}
