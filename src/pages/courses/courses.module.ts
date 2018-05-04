import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesPage } from './courses';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CoursesPage
  ],
  imports: [
    IonicPageModule.forChild(CoursesPage),
    ComponentsModule
  ],
})
export class CoursesPageModule {}
