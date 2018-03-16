import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FIREBASE_CONFIG } from "./firebase.credentials";
import {StudentQueueProvider} from "../providers/queue/queue";
import {StudentsProvider} from "../providers/students/students";
import {CoursesProvider} from "../providers/courses/courses";
import {StudentLoginProvider} from "../providers/student-login/student-login";
import {DataProvider} from "../providers/data/data";
import {AuthProvider} from "../providers/auth/auth";
import {AngularFireAuthModule} from "angularfire2/auth";
import {FormsModule} from "@angular/forms";

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
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentQueueProvider,
    StudentsProvider,
    CoursesProvider,
    StudentLoginProvider,
    DataProvider,
    AuthProvider
  ]
})
export class AppModule {}
