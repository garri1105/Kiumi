import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassesOfPreceptorPage } from './classes-of-preceptor';
import {SharedModule} from "../shared.module";

@NgModule({
  declarations: [
    ClassesOfPreceptorPage
  ],
  imports: [
    IonicPageModule.forChild(ClassesOfPreceptorPage),
    SharedModule
  ],
})
export class ClassesOfPreceptorPageModule {}
