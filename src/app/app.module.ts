import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FIREBASE_CONFIG } from "./firebase.credentials";
import {CourseDataProvider} from "../providers/course-data/course-data";
import {GlobalProfileProvider} from "../providers/global-profile/global-profile";
import {ProfileDataProvider} from "../providers/profile-data/profile-data";
import {AuthProvider} from "../providers/auth/auth";
import {AngularFireAuthModule} from "angularfire2/auth";
import {FormsModule} from "@angular/forms";
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { OfficeHoursDataProvider } from '../providers/office-hours-data/office-hours-data';
import { StudentQueueDataProvider } from '../providers/student-queue-data/student-queue-data';
import {GooglePlus} from "@ionic-native/google-plus";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CourseDataProvider,
    GlobalProfileProvider,
    ProfileDataProvider,
    AuthProvider,
    UtilitiesProvider,
    OfficeHoursDataProvider,
    StudentQueueDataProvider,
    GooglePlus
  ]
})
export class AppModule {}
