import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: string;
  tab2: string;

  constructor() {
    this.tab1 = 'CoursesPage';
    this.tab2 = 'ProfilePage'
  }
}
