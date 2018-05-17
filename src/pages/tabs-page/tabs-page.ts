import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../mosque-near/map';
import { SchedulePage } from '../schedule/schedule';
import { PrayertimePage } from '../prayertime/prayertime';
import { QiblaPage } from '../qibla/qibla';
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root:any =PrayertimePage;
  tab3Root: any = MapPage;
  tab4Root: any = QiblaPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
