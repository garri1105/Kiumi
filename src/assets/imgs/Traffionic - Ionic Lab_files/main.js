webpackJsonp([12],{

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var CourseDataProvider = (function () {
    function CourseDataProvider(db) {
        this.db = db;
        this.courseList$ = this.db.list('course-list');
    }
    CourseDataProvider_1 = CourseDataProvider;
    CourseDataProvider.prototype.getCourseListRef = function () {
        return this.courseList$;
    };
    CourseDataProvider.prototype.getCourseByKey = function (key) {
        this.courseObject = this.db.object("course-list/" + key);
        return this.courseObject.valueChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["take"])(1));
    };
    CourseDataProvider.prototype.addCourse = function (course) {
        return this.courseList$.push(course);
    };
    CourseDataProvider.prototype.removeCourse = function (course) {
        return this.courseList$.remove(course.key);
    };
    CourseDataProvider.prototype.updateCourse = function (course) {
        return this.courseList$.update(course.key, course);
    };
    CourseDataProvider.prototype.searchCourse = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var courseList, numberQuery, titleQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseList = [];
                        numberQuery = this.db.list('course-list', function (ref) {
                            return ref.orderByChild('number')
                                .startAt(query.toUpperCase())
                                .endAt(query.toUpperCase() + "\uf8ff");
                        }).valueChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["take"])(1));
                        titleQuery = this.db.list('course-list', function (ref) {
                            return ref.orderByChild('title')
                                .startAt(CourseDataProvider_1.toTitleCase(query))
                                .endAt(CourseDataProvider_1.toTitleCase(query) + "\uf8ff");
                        }).valueChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["take"])(1));
                        numberQuery.subscribe(function (r) { return courseList = courseList.concat(r); });
                        titleQuery.subscribe(function (r) { return courseList = courseList.concat(r); });
                        return [4 /*yield*/, numberQuery.toPromise()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, titleQuery.toPromise()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, courseList];
                }
            });
        });
    };
    CourseDataProvider.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    CourseDataProvider = CourseDataProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], CourseDataProvider);
    return CourseDataProvider;
    var CourseDataProvider_1;
}());

//# sourceMappingURL=course-data.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var AuthProvider = (function () {
    function AuthProvider(afAuth, gplus, platform, alert) {
        this.afAuth = afAuth;
        this.gplus = gplus;
        this.platform = platform;
        this.alert = alert;
    }
    AuthProvider.prototype.sendPasswordResetEmail = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.googleLogin = function () {
        if (this.platform.is('cordova')) {
            this.nativeGoogleLogin();
        }
        else {
            return this.webGoogleLogin();
        }
    };
    AuthProvider.prototype.nativeGoogleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gplusUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.gplus.login({
                                'webClientId': '48365895185-7vnbechfbhvgnbp96r02b9m31u5gok4s.apps.googleusercontent.com',
                                'offline': true,
                                'scopes': 'profile email'
                            })];
                    case 1:
                        gplusUser = _a.sent();
                        return [4 /*yield*/, this.afAuth.auth.signInWithCredential(__WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].GoogleAuthProvider.credential(gplusUser.idToken))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        this.alert.create({
                            message: 'Native error: ' + e_1
                        }).present();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.webGoogleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        provider = new __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].GoogleAuthProvider();
                        provider.addScope('profile');
                        provider.addScope('email');
                        return [4 /*yield*/, this.afAuth.auth.signInWithPopup(provider)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.getAuthenticatedUser = function () {
        return this.afAuth.authState;
    };
    AuthProvider.prototype.createUserWithEmailAndPassword = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = {};
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(account.email, account.password)];
                    case 1: return [2 /*return*/, (_a.result = _b.sent(),
                            _a)];
                    case 2:
                        e_3 = _b.sent();
                        return [2 /*return*/, {
                                error: e_3
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.signInWithEmailAndPassword = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = {};
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)];
                    case 1: return [2 /*return*/, (_a.result = _b.sent(),
                            _a)];
                    case 2:
                        e_4 = _b.sent();
                        console.log(e_4);
                        console.log(e_4.code);
                        console.log(e_4.message);
                        if (e_4.code === 'auth/wrong-password') {
                            e_4.message = 'Invalid email or password combination';
                        }
                        return [2 /*return*/, {
                                error: e_4,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.signOut()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_5 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilitiesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__course_data_course_data__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_data_profile_data__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var UtilitiesProvider = (function () {
    function UtilitiesProvider(courseData, profileData) {
        this.courseData = courseData;
        this.profileData = profileData;
    }
    UtilitiesProvider.sortByDate = function (officeHours) {
        officeHours.sort(function (a, b) {
            return __WEBPACK_IMPORTED_MODULE_4_moment__(a.date).diff(__WEBPACK_IMPORTED_MODULE_4_moment__(b.date));
        });
    };
    UtilitiesProvider.getDayDistance = function (a, b) {
        return ((b - a) + 7) % 7;
    };
    UtilitiesProvider.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    UtilitiesProvider.pad = function (num, size) {
        var s = String(num);
        while (s.length < (size || 2)) {
            s = "0" + s;
        }
        return s;
    };
    UtilitiesProvider.makeId = function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    UtilitiesProvider.prototype.resetDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resetCourses()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resetProfiles()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.resetAccounts()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //TODO Fix initializations
    UtilitiesProvider.prototype.resetCourses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.courseData
                            .getCourseListRef()
                            .snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["take"])(1))
                            .map(function (changes) {
                            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val(), { officeHours: [{ key: '0' }], instructors: ['0'], students: ['0'] })); });
                        })
                            .subscribe(function (courses) {
                            courses.map(function (course) {
                                _this.courseData.updateCourse(course);
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UtilitiesProvider.prototype.resetProfiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileData
                            .getProfileListRef()
                            .snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["take"])(1))
                            .map(function (changes) {
                            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val(), { name: c.payload.val().name, instructor: { courses: ['0'],
                                    officeHours: ['0']
                                }, student: { courses: ['0'] } })); });
                        })
                            .subscribe(function (profiles) {
                            profiles.map(function (profile) {
                                console.log(profile);
                                _this.profileData.updateProfile(profile);
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // resetOfficeHours() {
    //   this.courseData
    //     .getCourseList()
    //     .snapshotChanges()
    //     .map(changes => {
    //         return changes.map(c => ({
    //           key: c.payload.key,
    //           ...c.payload.val(),
    //           officeHours: ['0'],
    //         }))
    //       }
    //     )
    //     .subscribe(courses => {
    //       courses.map(course => {
    //         this.courseData.updateCourse(course);
    //
    //         this.profileData
    //           .getProfileList()
    //           .snapshotChanges()
    //           .map(changes => {
    //               return changes.map(c => ({
    //                 key: c.payload.key,
    //                 ...c.payload.val(),
    //                 instructor: {
    //                   officeHours: ['0']
    //                 },
    //               }))
    //             }
    //           )
    //           .subscribe(profiles => {
    //             profiles.map(profile => {
    //               this.profileData.updateProfile(profile);
    //             });
    //           });
    //       });
    //     });
    // }
    UtilitiesProvider.prototype.resetAccounts = function () {
        var _this = this;
        this.profileData
            .getProfileListRef()
            .snapshotChanges()
            .map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        })
            .subscribe(function (profiles) {
            profiles.map(function (profile) {
                _this.profileData.removeProfile(profile);
            });
        });
    };
    UtilitiesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__course_data_course_data__["a" /* CourseDataProvider */],
            __WEBPACK_IMPORTED_MODULE_2__profile_data_profile_data__["a" /* ProfileDataProvider */]])
    ], UtilitiesProvider);
    return UtilitiesProvider;
}());

//# sourceMappingURL=utilities.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-courses/add-courses.module": [
		684,
		7
	],
	"../pages/courses/courses.module": [
		683,
		8
	],
	"../pages/edit-hours/edit-hours.module": [
		685,
		6
	],
	"../pages/edit-profile/edit-profile.module": [
		686,
		5
	],
	"../pages/home/home.module": [
		687,
		11
	],
	"../pages/login/login.module": [
		688,
		4
	],
	"../pages/office-hours/office-hours.module": [
		689,
		1
	],
	"../pages/password-reset/password-reset.module": [
		690,
		10
	],
	"../pages/profile/profile.module": [
		691,
		3
	],
	"../pages/sign-up/sign-up.module": [
		692,
		2
	],
	"../pages/student-queue/student-queue.module": [
		693,
		0
	],
	"../pages/tabs/tabs.module": [
		694,
		9
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 222;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentQueueDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StudentQueueDataProvider = (function () {
    function StudentQueueDataProvider(db) {
        this.db = db;
    }
    StudentQueueDataProvider.prototype.getStudentQueueRef = function (officeHours, course) {
        this.studentQueue$ = this.db.object("course-list/" + course.key + "/officeHours/" + officeHours.key + "/studentQueue");
        return this.studentQueue$;
    };
    StudentQueueDataProvider.prototype.updateQueue = function (profiles) {
        var studentQueue = profiles.map(function (profile) {
            return profile.key;
        });
        return this.studentQueue$.set(studentQueue);
    };
    StudentQueueDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], StudentQueueDataProvider);
    return StudentQueueDataProvider;
}());

//# sourceMappingURL=student-queue-data.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfficeHoursDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_data_profile_data__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utilities_utilities__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OfficeHoursDataProvider = (function () {
    function OfficeHoursDataProvider(db, profileData) {
        this.db = db;
        this.profileData = profileData;
        this.profile = this.profileData.getProfile();
    }
    OfficeHoursDataProvider.prototype.getOfficeHoursByKey = function (courseKey, officeHoursIndex) {
        this.officeHours = this.db.object("course-list/" + courseKey + "/officeHours/" + officeHoursIndex);
        return this.officeHours.valueChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["take"])(1));
    };
    OfficeHoursDataProvider.prototype.getOfficeHoursListRef = function (courseKey) {
        this.officeHoursList$ = this.db.list("course-list/" + courseKey + "/officeHours");
        return this.officeHoursList$;
    };
    OfficeHoursDataProvider.prototype.addOfficeHours = function (officeHours) {
        var cleanOfficeHours = this.prepareOfficeHours(officeHours);
        return this.officeHoursList$.set(cleanOfficeHours.key, cleanOfficeHours);
    };
    OfficeHoursDataProvider.prototype.updateOfficeHours = function (officeHours) {
        var cleanOfficeHours = this.prepareOfficeHours(officeHours);
        return this.officeHoursList$.update(cleanOfficeHours.key, cleanOfficeHours);
    };
    OfficeHoursDataProvider.prototype.removeOfficeHours = function (officeHours) {
        return this.officeHoursList$.remove(officeHours.key);
    };
    OfficeHoursDataProvider.prototype.prepareOfficeHours = function (original) {
        var officeHours = JSON.parse(JSON.stringify(original));
        var dist = __WEBPACK_IMPORTED_MODULE_4__utilities_utilities__["a" /* UtilitiesProvider */].getDayDistance(__WEBPACK_IMPORTED_MODULE_3_moment__().isoWeekday(), __WEBPACK_IMPORTED_MODULE_3_moment__().isoWeekday(officeHours.dayOfWeek.trim()).isoWeekday());
        var newDate = __WEBPACK_IMPORTED_MODULE_3_moment__(officeHours.startTime, 'HH:mm');
        newDate = __WEBPACK_IMPORTED_MODULE_3_moment__().add(dist, 'days')
            .hours(newDate.hours())
            .minutes(newDate.minutes());
        if (dist === 0 && newDate.diff(__WEBPACK_IMPORTED_MODULE_3_moment__()) < 0) {
            newDate.add(7, 'days');
        }
        officeHours.date = newDate.format('ddd, DD MMM YYYY, HH:mm');
        officeHours.instructing = null;
        officeHours.dayOfWeek = null;
        officeHours.startTime = null;
        officeHours.endTime = null;
        officeHours.instructorsO = null;
        return officeHours;
    };
    OfficeHoursDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_2__profile_data_profile_data__["a" /* ProfileDataProvider */]])
    ], OfficeHoursDataProvider);
    return OfficeHoursDataProvider;
}());

//# sourceMappingURL=office-hours-data.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(464);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__firebase_credentials__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_course_data_course_data__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_profile_data_profile_data__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_auth_auth__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_utilities_utilities__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_office_hours_data_office_hours_data__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_student_queue_data_student_queue_data__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_google_plus__ = __webpack_require__(410);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    config: {
                        clickBlock: false
                    }
                }, {
                    links: [
                        { loadChildren: '../pages/courses/courses.module#CoursesPageModule', name: 'CoursesPage', segment: 'courses', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-courses/add-courses.module#AddCoursesPageModule', name: 'AddCoursesPage', segment: 'add-courses', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-hours/edit-hours.module#EditHoursPageModule', name: 'EditHoursPage', segment: 'edit-hours', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-profile/edit-profile.module#EditProfilePageModule', name: 'EditProfilePage', segment: 'edit-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomeModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/office-hours/office-hours.module#OfficeHoursPageModule', name: 'OfficeHoursPage', segment: 'office-hours', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/password-reset/password-reset.module#PasswordResetPageModule', name: 'PasswordResetPage', segment: 'password-reset', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-up/sign-up.module#RegisterPageModule', name: 'SignUpPage', segment: 'sign-up', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/student-queue/student-queue.module#StudentQueuePageModule', name: 'StudentQueuePage', segment: 'student-queue', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_8__firebase_credentials__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_forms__["a" /* FormsModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_course_data_course_data__["a" /* CourseDataProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_profile_data_profile_data__["a" /* ProfileDataProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_utilities_utilities__["a" /* UtilitiesProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_office_hours_data_office_hours_data__["a" /* OfficeHoursDataProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_student_queue_data_student_queue_data__["a" /* StudentQueueDataProvider */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_google_plus__["a" /* GooglePlus */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 643:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 286,
	"./af.js": 286,
	"./ar": 287,
	"./ar-dz": 288,
	"./ar-dz.js": 288,
	"./ar-kw": 289,
	"./ar-kw.js": 289,
	"./ar-ly": 290,
	"./ar-ly.js": 290,
	"./ar-ma": 291,
	"./ar-ma.js": 291,
	"./ar-sa": 292,
	"./ar-sa.js": 292,
	"./ar-tn": 293,
	"./ar-tn.js": 293,
	"./ar.js": 287,
	"./az": 294,
	"./az.js": 294,
	"./be": 295,
	"./be.js": 295,
	"./bg": 296,
	"./bg.js": 296,
	"./bm": 297,
	"./bm.js": 297,
	"./bn": 298,
	"./bn.js": 298,
	"./bo": 299,
	"./bo.js": 299,
	"./br": 300,
	"./br.js": 300,
	"./bs": 301,
	"./bs.js": 301,
	"./ca": 302,
	"./ca.js": 302,
	"./cs": 303,
	"./cs.js": 303,
	"./cv": 304,
	"./cv.js": 304,
	"./cy": 305,
	"./cy.js": 305,
	"./da": 306,
	"./da.js": 306,
	"./de": 307,
	"./de-at": 308,
	"./de-at.js": 308,
	"./de-ch": 309,
	"./de-ch.js": 309,
	"./de.js": 307,
	"./dv": 310,
	"./dv.js": 310,
	"./el": 311,
	"./el.js": 311,
	"./en-au": 312,
	"./en-au.js": 312,
	"./en-ca": 313,
	"./en-ca.js": 313,
	"./en-gb": 314,
	"./en-gb.js": 314,
	"./en-ie": 315,
	"./en-ie.js": 315,
	"./en-il": 316,
	"./en-il.js": 316,
	"./en-nz": 317,
	"./en-nz.js": 317,
	"./eo": 318,
	"./eo.js": 318,
	"./es": 319,
	"./es-do": 320,
	"./es-do.js": 320,
	"./es-us": 321,
	"./es-us.js": 321,
	"./es.js": 319,
	"./et": 322,
	"./et.js": 322,
	"./eu": 323,
	"./eu.js": 323,
	"./fa": 324,
	"./fa.js": 324,
	"./fi": 325,
	"./fi.js": 325,
	"./fo": 326,
	"./fo.js": 326,
	"./fr": 327,
	"./fr-ca": 328,
	"./fr-ca.js": 328,
	"./fr-ch": 329,
	"./fr-ch.js": 329,
	"./fr.js": 327,
	"./fy": 330,
	"./fy.js": 330,
	"./gd": 331,
	"./gd.js": 331,
	"./gl": 332,
	"./gl.js": 332,
	"./gom-latn": 333,
	"./gom-latn.js": 333,
	"./gu": 334,
	"./gu.js": 334,
	"./he": 335,
	"./he.js": 335,
	"./hi": 336,
	"./hi.js": 336,
	"./hr": 337,
	"./hr.js": 337,
	"./hu": 338,
	"./hu.js": 338,
	"./hy-am": 339,
	"./hy-am.js": 339,
	"./id": 340,
	"./id.js": 340,
	"./is": 341,
	"./is.js": 341,
	"./it": 342,
	"./it.js": 342,
	"./ja": 343,
	"./ja.js": 343,
	"./jv": 344,
	"./jv.js": 344,
	"./ka": 345,
	"./ka.js": 345,
	"./kk": 346,
	"./kk.js": 346,
	"./km": 347,
	"./km.js": 347,
	"./kn": 348,
	"./kn.js": 348,
	"./ko": 349,
	"./ko.js": 349,
	"./ky": 350,
	"./ky.js": 350,
	"./lb": 351,
	"./lb.js": 351,
	"./lo": 352,
	"./lo.js": 352,
	"./lt": 353,
	"./lt.js": 353,
	"./lv": 354,
	"./lv.js": 354,
	"./me": 355,
	"./me.js": 355,
	"./mi": 356,
	"./mi.js": 356,
	"./mk": 357,
	"./mk.js": 357,
	"./ml": 358,
	"./ml.js": 358,
	"./mn": 359,
	"./mn.js": 359,
	"./mr": 360,
	"./mr.js": 360,
	"./ms": 361,
	"./ms-my": 362,
	"./ms-my.js": 362,
	"./ms.js": 361,
	"./mt": 363,
	"./mt.js": 363,
	"./my": 364,
	"./my.js": 364,
	"./nb": 365,
	"./nb.js": 365,
	"./ne": 366,
	"./ne.js": 366,
	"./nl": 367,
	"./nl-be": 368,
	"./nl-be.js": 368,
	"./nl.js": 367,
	"./nn": 369,
	"./nn.js": 369,
	"./pa-in": 370,
	"./pa-in.js": 370,
	"./pl": 371,
	"./pl.js": 371,
	"./pt": 372,
	"./pt-br": 373,
	"./pt-br.js": 373,
	"./pt.js": 372,
	"./ro": 374,
	"./ro.js": 374,
	"./ru": 375,
	"./ru.js": 375,
	"./sd": 376,
	"./sd.js": 376,
	"./se": 377,
	"./se.js": 377,
	"./si": 378,
	"./si.js": 378,
	"./sk": 379,
	"./sk.js": 379,
	"./sl": 380,
	"./sl.js": 380,
	"./sq": 381,
	"./sq.js": 381,
	"./sr": 382,
	"./sr-cyrl": 383,
	"./sr-cyrl.js": 383,
	"./sr.js": 382,
	"./ss": 384,
	"./ss.js": 384,
	"./sv": 385,
	"./sv.js": 385,
	"./sw": 386,
	"./sw.js": 386,
	"./ta": 387,
	"./ta.js": 387,
	"./te": 388,
	"./te.js": 388,
	"./tet": 389,
	"./tet.js": 389,
	"./tg": 390,
	"./tg.js": 390,
	"./th": 391,
	"./th.js": 391,
	"./tl-ph": 392,
	"./tl-ph.js": 392,
	"./tlh": 393,
	"./tlh.js": 393,
	"./tr": 394,
	"./tr.js": 394,
	"./tzl": 395,
	"./tzl.js": 395,
	"./tzm": 396,
	"./tzm-latn": 397,
	"./tzm-latn.js": 397,
	"./tzm.js": 396,
	"./ug-cn": 398,
	"./ug-cn.js": 398,
	"./uk": 399,
	"./uk.js": 399,
	"./ur": 400,
	"./ur.js": 400,
	"./uz": 401,
	"./uz-latn": 402,
	"./uz-latn.js": 402,
	"./uz.js": 401,
	"./vi": 403,
	"./vi.js": 403,
	"./x-pseudo": 404,
	"./x-pseudo.js": 404,
	"./yo": 405,
	"./yo.js": 405,
	"./zh-cn": 406,
	"./zh-cn.js": 406,
	"./zh-hk": 407,
	"./zh-hk.js": 407,
	"./zh-tw": 408,
	"./zh-tw.js": 408
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 643;

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var ProfileDataProvider = (function () {
    function ProfileDataProvider(database) {
        this.database = database;
        this.profileList = this.database.list('profiles');
    }
    ProfileDataProvider.prototype.getProfileById = function (userId) {
        this.profileObject = this.database.object("/profiles/" + userId);
        return this.profileObject.valueChanges();
    };
    ProfileDataProvider.prototype.getProfileListRef = function () {
        return this.profileList;
    };
    ProfileDataProvider.prototype.updateProfile = function (profile) {
        return this.profileList.update(profile.key, profile);
    };
    ProfileDataProvider.prototype.getProfileRef = function (user) {
        this.user = user;
        if (user) {
            this.profileObject = this.database.object("/profiles/" + user.uid);
            return this.profileObject.valueChanges();
        }
    };
    ProfileDataProvider.prototype.removeProfile = function (profile) {
        return this.profileList.remove(profile.key);
    };
    ProfileDataProvider.prototype.saveProfile = function (user, profile) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.profileObject = this.database.object("/profiles/" + user.uid);
                        profile.key = user.uid;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.profileObject.set(profile)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProfileDataProvider.prototype.loadProfile = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var profile$;
            return __generator(this, function (_a) {
                profile$ = this.getProfileRef(user);
                if (profile$) {
                    profile$.pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["take"])(1)).subscribe(function (profile) {
                        console.log('Second subscription. Profile Data. Getting Profile');
                        _this.profile = profile;
                    });
                }
                return [2 /*return*/, profile$];
            });
        });
    };
    ProfileDataProvider.prototype.getProfile = function () {
        if (this.profile) {
            return this.profile;
        }
        else if (this.getProfileRef(this.user)) {
            return null;
        }
        else {
            console.log('Error loading profile');
            return {};
        }
    };
    ProfileDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ProfileDataProvider);
    return ProfileDataProvider;
}());

//# sourceMappingURL=profile-data.js.map

/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_profile_data_profile_data__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, auth, profileData) {
        this.auth = auth;
        this.profileData = profileData;
        this.getUserCacheAndRedirect();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.getUserCacheAndRedirect = function () {
        var _this = this;
        this.auth.getAuthenticatedUser().subscribe(function (user) {
            console.log('First subscription. App Component. Authenticated User');
            console.log(user);
            if (!user) {
                _this.rootPage = 'HomePage';
            }
            else {
                _this.profileData.loadProfile(user)
                    .then(function (r) {
                    r.pipe(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["take"])(1)).subscribe(function (val) {
                        val ? _this.rootPage = 'TabsPage' : _this.rootPage = 'EditProfilePage';
                    });
                });
            }
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/Salman/TraffIonic/src/app/app.html"*/'<ion-nav [root]="rootPage" [class]="theme"></ion-nav>\n\n'/*ion-inline-end:"/Users/Salman/TraffIonic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_profile_data_profile_data__["a" /* ProfileDataProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyBnL7vJC0XmK99CUMo2q1AzqldkvFX0114",
    authDomain: "traffionic.firebaseapp.com",
    databaseURL: "https://traffionic.firebaseio.com",
    projectId: "traffionic",
    storageBucket: "",
    messagingSenderId: "48365895185"
};
//# sourceMappingURL=firebase.credentials.js.map

/***/ })

},[456]);
//# sourceMappingURL=main.js.map