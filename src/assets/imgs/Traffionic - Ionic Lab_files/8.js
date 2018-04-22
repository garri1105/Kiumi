webpackJsonp([8],{

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoursesPageModule", function() { return CoursesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_course_list_course_list__ = __webpack_require__(696);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CoursesPageModule = (function () {
    function CoursesPageModule() {
    }
    CoursesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__courses__["a" /* CoursesPage */],
                __WEBPACK_IMPORTED_MODULE_3__components_course_list_course_list__["a" /* CourseListComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__courses__["a" /* CoursesPage */]),
            ],
        })
    ], CoursesPageModule);
    return CoursesPageModule;
}());

//# sourceMappingURL=courses.module.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoursesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_course_data_course_data__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utilities_utilities__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_profile_data_profile_data__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CoursesPage = (function () {
    function CoursesPage(courseData, profileData, loading, utilities) {
        this.courseData = courseData;
        this.profileData = profileData;
        this.loading = loading;
        this.utilities = utilities;
        this.resetDatabase(false);
    }
    CoursesPage.prototype.ionViewCanEnter = function () {
        return this.courseList;
    };
    CoursesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('Entering courses page');
        this.courseList = [];
        this.profile = this.profileData.getProfile();
        this.courseList$ = this.courseData
            .getCourseListRef()
            .valueChanges().subscribe(function (courses) {
            _this.loadCourses(courses);
        });
    };
    CoursesPage.prototype.ionViewWillLeave = function () {
        console.log('Leaving courses page');
        this.ready = false;
        this.courseList$.unsubscribe();
    };
    CoursesPage.prototype.loadCourses = function (courses) {
        var _this = this;
        this.courseList = courses.filter(function (course) {
            return ((_this.profile.instructor && _this.profile.instructor.courses.indexOf(course.key) > -1) ||
                (_this.profile.student && _this.profile.student.courses.indexOf(course.key)) > -1);
        });
        this.ready = true;
    };
    CoursesPage.prototype.resetDatabase = function (active) {
        if (active) {
            var deleter_1 = this.loading.create({
                content: 'Reseting database...'
            });
            deleter_1.present();
            this.utilities.resetDatabase().then(function () {
                deleter_1.dismiss();
            });
        }
    };
    CoursesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-student-courses',template:/*ion-inline-start:"/Users/Salman/TraffIonic/src/pages/courses/courses.html"*/'<ion-header>\n\n  <ion-navbar>\n      <ion-title>\n        My Courses\n      </ion-title>\n    <ion-buttons end>\n      <button ion-button  [navPush]="\'AddCoursesPage\'">\n        <ion-icon id="addbutton" name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <course-list class="transparent" *ngIf="courseList?.length > 0" [courseList]="courseList"></course-list>\n  <p *ngIf="courseList?.length === 0 && ready" class="overlay-text">Hit the + to start adding courses!</p>\n</ion-content>\n'/*ion-inline-end:"/Users/Salman/TraffIonic/src/pages/courses/courses.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_course_data_course_data__["a" /* CourseDataProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_profile_data_profile_data__["a" /* ProfileDataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utilities_utilities__["a" /* UtilitiesProvider */]])
    ], CoursesPage);
    return CoursesPage;
}());

//# sourceMappingURL=courses.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_course_data_course_data__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_profile_data_profile_data__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CourseListComponent = (function () {
    function CourseListComponent(courseData, profileData, toast) {
        this.courseData = courseData;
        this.profileData = profileData;
        this.toast = toast;
        this.profile = this.profileData.getProfile();
        this.studentButton = false;
        this.instructorButton = false;
        this.errorToast = this.toast.create({ duration: 3000 });
    }
    CourseListComponent.prototype.toggleSection = function (event) {
        if (event === 'student') {
            this.studentButton = !this.studentButton;
        }
        else if (event === 'instructor') {
            this.instructorButton = !this.instructorButton;
        }
    };
    CourseListComponent.prototype.removeCourse = function (profile, course) {
        var _this = this;
        profile.courses.splice(profile.courses.indexOf(course.key), 1);
        this.courseData.getCourseByKey(course.key)
            .subscribe(function (course) {
            if (_this.isInstructor(profile)) {
                course.instructors.splice(course.instructors.indexOf(_this.profile.key), 1);
            }
            else {
                course.students.splice(course.students.indexOf(_this.profile.key), 1);
            }
            _this.courseData.updateCourse(course)
                .catch(function (e) { return _this.errorToast.setMessage(e).present(); });
        });
        this.profileData.updateProfile(this.profile)
            .catch(function (e) { return _this.errorToast.setMessage(e).present(); });
    };
    CourseListComponent.prototype.isInstructor = function (profile) {
        return profile.officeHours !== undefined;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], CourseListComponent.prototype, "courseList", void 0);
    CourseListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'course-list',template:/*ion-inline-start:"/Users/Salman/TraffIonic/src/components/course-list/course-list.html"*/'<ion-list>\n  <ion-list-header class="dropdown" *ngIf="profile.student" no-lines no-padding>\n    <button detail-none ion-item (click)="toggleSection(\'student\')">\n      <ion-icon item-left name="arrow-dropright" *ngIf="!studentButton"></ion-icon>\n      <ion-icon item-left name="arrow-dropdown" *ngIf="studentButton"></ion-icon>\n      Attending</button>\n    <ion-list *ngIf="studentButton">\n      <ion-item-sliding *ngFor="let course of courseList">\n        <ion-item detail-none\n                  *ngIf="profile.student.courses.indexOf(course.key) > -1"\n                  [navPush]="\'OfficeHoursPage\'"\n                  [navParams]={course:course}>\n          {{ course.number }}\n          <br>\n          <h3>{{ course.title }}</h3>\n          <ion-icon item-end name="arrow-forward"></ion-icon>\n        </ion-item>\n        <ion-item-options side="left">\n          <button ion-button class="trash" color="danger" (click)="removeCourse(profile.student, course)">\n            <ion-icon name="trash"></ion-icon>\n            DELETE\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </ion-list-header>\n  <ion-list-header class="dropdown" *ngIf="profile.instructor" no-lines no-padding>\n    <button detail-none ion-item (click)="toggleSection(\'instructor\')">\n      <ion-icon item-left name="arrow-dropright" *ngIf="!instructorButton"></ion-icon>\n      <ion-icon item-left name="arrow-dropdown" *ngIf="instructorButton"></ion-icon>\n      Instructing</button>\n    <ion-list *ngIf="instructorButton">\n      <ion-item-sliding *ngFor="let course of courseList">\n        <ion-item detail-none\n                  *ngIf="profile.instructor.courses.indexOf(course.key) > -1"\n                  [navPush]="\'OfficeHoursPage\'"\n                  [navParams]={course:course}>\n          {{ course.number }}\n          <br>\n          <h3>{{ course.title }}</h3>\n          <ion-icon item-end name="arrow-forward"></ion-icon>\n        </ion-item>\n        <ion-item-options side="left">\n          <button ion-button\n                  class="trash"\n                  color="danger"\n                  (click)="removeCourse(profile.instructor, course)">\n            <ion-icon name="trash"></ion-icon>\n            DELETE\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </ion-list-header>\n</ion-list>\n'/*ion-inline-end:"/Users/Salman/TraffIonic/src/components/course-list/course-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_course_data_course_data__["a" /* CourseDataProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_profile_data_profile_data__["a" /* ProfileDataProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* ToastController */]])
    ], CourseListComponent);
    return CourseListComponent;
}());

//# sourceMappingURL=course-list.js.map

/***/ })

});
//# sourceMappingURL=8.js.map