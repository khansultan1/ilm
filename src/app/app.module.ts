import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { IslamicApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/mosque-near/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';

import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { TimeTableData } from '../providers/timetable-data';
import { UserData } from '../providers/user-data';
import { PrayertimePage } from '../pages/prayertime/prayertime';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
@NgModule({
  declarations: [
    IslamicApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    PrayertimePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(IslamicApp, {}, {
      links: [
        // { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        // { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        // { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        // { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        // { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        // { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        // { component: MapPage, name: 'Map', segment: 'map' },
        // { component: AboutPage, name: 'About', segment: 'about' },
        // { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        // { component: SupportPage, name: 'SupportPage', segment: 'support' },
        // { component: LoginPage, name: 'LoginPage', segment: 'login' },
        // { component: AccountPage, name: 'AccountPage', segment: 'account' },
        // { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IslamicApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    PrayertimePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TimeTableData,
    UserData,
    InAppBrowser,
    SplashScreen,
    LocationAccuracy
  ]
})
export class AppModule { }
