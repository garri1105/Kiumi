import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCoursesPage } from './add-courses';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AddCoursesPage
  ],
  imports: [
    IonicPageModule.forChild(AddCoursesPage),
    ComponentsModule
  ],
})
export class AddCoursesPageModule {}
