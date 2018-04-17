import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "../../models/course/course.interface";
import {CourseDataProvider} from "../../providers/course-data/course-data";
import {Profile} from "../../models/profile/profile.interface";

@Component({
  selector: 'course-search',
  templateUrl: 'course-search.html'
})
export class CourseSearchComponent {

  courseList: Course[] = [];
  savedCourses: Course[] = [];
  selectedCourses: Course[] = [];

  @Input() profile: Profile;
  @Output() addedCourses: EventEmitter<Course[]>;

  constructor(private courseData: CourseDataProvider) {
    this.addedCourses = new EventEmitter<Course[]>();
  }

  searchCourse(query: string) {
    this.courseList = [];
    if (query.length > 0) {
      this.courseData.searchCourse(query)
        .then(courseList => {
          this.courseList = courseList;
          this.savedCourses.forEach(selected => {
            this.courseList.forEach((course, i) => {
              if (selected.key === course.key) {
                this.courseList.splice(i, 1);
              }
            })
          });
      })
    }
  }

  addCourse(selected: Course) {
    if (selected.selection !== null) {
      this.selectedCourses.forEach((course, i) => {
        if (course.key === selected.key) {
          this.selectedCourses.splice(i, 1);
        }
      });

      this.selectedCourses.push(selected);

      this.courseList.splice(this.courseList.indexOf(selected), 1);

      this.addedCourses.emit(this.selectedCourses);
    }
  }

  ngOnInit() {
    if (this.profile.instructor) {
      this.profile.instructor.courses.forEach(courseKey => {
        this.courseData.getCourseByKey(courseKey)
          .subscribe((course: Course) => {
            if (course) {
              course.selection = 'Instructor';
              this.savedCourses.push(course);
            }
          })
      });
    }

    if (this.profile.student) {
      this.profile.student.courses.forEach(courseKey => {
        this.courseData.getCourseByKey(courseKey)
          .subscribe((course: Course) => {
            if (course) {
              course.selection = 'Student';
              this.savedCourses.push(course);
            }
          })
      });
    }
  }
}
