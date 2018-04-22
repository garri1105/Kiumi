webpackJsonp([3],{

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_profile_view_profile_view__ = __webpack_require__(711);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ProfilePageModule = (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_3__components_profile_view_profile_view__["a" /* ProfileViewComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfilePage = (function () {
    function ProfilePage(alert) {
        this.alert = alert;
    }
    ProfilePage.prototype.signOutResult = function (event) {
        var _this = this;
        event
            .then(function (r) {
            console.log('Sign out successful: ' + r);
        })
            .catch(function (error) {
            return _this.alert.create({
                title: 'Failed to sign out',
                subTitle: error
            });
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/Salman/TraffIonic/src/pages/profile/profile.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Profile</ion-title>\n    <ion-buttons end>\n      <button ion-button\n              [navPush]="\'EditProfilePage\'">\n        Edit</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <profile-view (signOutResult)="signOutResult($event)"></profile-view>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Salman/TraffIonic/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_profile_data_profile_data__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileViewComponent = (function () {
    function ProfileViewComponent(profileData, auth) {
        this.profileData = profileData;
        this.auth = auth;
        this.profile = this.profileData.getProfile();
        this.signOutResult = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    ProfileViewComponent.prototype.signOut = function () {
        this.signOutResult.emit(this.auth.signOut());
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], ProfileViewComponent.prototype, "signOutResult", void 0);
    ProfileViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'profile-view',template:/*ion-inline-start:"/Users/Salman/TraffIonic/src/components/profile-view/profile-view.html"*/'<img class="myAvatar" [src]="profile.avatarURL">\n<ion-card>\n  <ion-card-content>\n    <!--<ion-item>-->\n      <!--<ion-label floating>Preferred Name</ion-label>-->\n      <!--<ion-input [value]="profile.name" readonly></ion-input>-->\n    <!--</ion-item>-->\n    <!--<ion-item>-->\n      <!--<ion-label floating>Status</ion-label>-->\n      <!--<ion-input *ngIf="this.profile.instructor" readonly [value]="\'Instructor\'"></ion-input>-->\n      <!--<ion-input *ngIf="this.profile.student" readonly [value]="\'Student\'"></ion-input>-->\n    <!--</ion-item>-->\n    <ion-list>\n      <ion-list-header>\n        Preferred Name\n      </ion-list-header>\n      <ion-item><h6>{{ profile.name }}</h6></ion-item>\n    </ion-list>\n    <br>\n    <ion-list>\n      <ion-list-header>\n        Status\n      </ion-list-header>\n      <ion-item *ngIf="this.profile.instructor"><h6>Instructor</h6></ion-item>\n      <ion-item *ngIf="this.profile.student"><h6>Student</h6></ion-item>\n    </ion-list>\n  </ion-card-content>\n</ion-card>\n\n\n  <ion-row>\n    <ion-col>\n      <button ion-button class="signOut" (click)="signOut()">Sign out</button>\n    </ion-col>\n  </ion-row>\n\n'/*ion-inline-end:"/Users/Salman/TraffIonic/src/components/profile-view/profile-view.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_profile_data_profile_data__["a" /* ProfileDataProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */]])
    ], ProfileViewComponent);
    return ProfileViewComponent;
}());

//# sourceMappingURL=profile-view.js.map

/***/ })

});
//# sourceMappingURL=3.js.map