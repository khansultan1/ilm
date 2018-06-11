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
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { DuaPage } from '../pages/dua/dua';
import { TimeTableData } from '../providers/timetable-data';
import { UserData } from '../providers/user-data';
import { PrayertimePage } from '../pages/prayertime/prayertime';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { QiblaPage } from '../pages/qibla/qibla';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GetLocation } from '../providers/getcurrentlocation';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { DuadetailsPage } from '../pages/duadetails/duadetails';
import { NameofallahPage } from '../pages/nameofallah/nameofallah';
import { SinglenamePage } from '../pages/singlename/singlename';

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
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    PrayertimePage,
    QiblaPage,
    DuaPage,
    DuadetailsPage,
    NameofallahPage,
    SinglenamePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(IslamicApp, {}),
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
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    PrayertimePage,
    QiblaPage,
    DuaPage,
    DuadetailsPage,
    NameofallahPage,
    SinglenamePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TimeTableData,
    UserData,
    InAppBrowser,
    SplashScreen,
    LocationAccuracy,
    DeviceOrientation,
    Diagnostic,
    GetLocation,
    Geolocation,
    NativeGeocoder
  ]
})
export class AppModule { }
