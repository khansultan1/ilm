import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { IslamicApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/mosque-near/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { ZakatcalcPage } from '../pages/zakatcalc/zakatcalc';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DuaPage } from '../pages/dua/dua';
import { TimeTableData } from '../providers/timetable-data';
import { UserData } from '../providers/user-data';
import { PrayertimePage } from '../pages/prayertime/prayertime';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { QiblaPage } from '../pages/qibla/qibla';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { DuadetailsPage } from '../pages/duadetails/duadetails';
import { NameofallahPage } from '../pages/nameofallah/nameofallah';
import { SinglenamePage } from '../pages/singlename/singlename';
import { TasbeehPage } from '../pages/tasbeeh/tasbeeh';
import { HalalPlacesPage } from '../pages/halal-places/halal-places';
import { CalendarPage } from '../pages/calendar/calendar';
import { IslamicChannelPage } from '../pages/islamic-channel/islamic-channel';
import { ShowvideoPage } from '../pages/showvideo/showvideo';
import { SettingsPage } from '../pages/settings/settings';
import { TimepreferencesPage } from '../pages/timepreferences/timepreferences';
import { FeedbackPage, FormsPage  } from '../pages/feedback/feedback';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QuranPage  } from '../pages/quran/quran';
import { Network } from '@ionic-native/network';
import { Deeplinks } from '@ionic-native/deeplinks';
@NgModule({
  declarations: [
    IslamicApp,
    AboutPage,
    LoginPage,
    MapPage,
    SchedulePage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    ZakatcalcPage,
    PrayertimePage,
    QiblaPage,
    DuaPage,
    DuadetailsPage,
    NameofallahPage,
    SinglenamePage,
    TasbeehPage,
    HalalPlacesPage,
    CalendarPage,
    IslamicChannelPage,
    ShowvideoPage,
    SettingsPage,
    TimepreferencesPage,
    FeedbackPage,
    FormsPage,
    QuranPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(IslamicApp, {navExitApp: false}),
    IonicStorageModule.forRoot()
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    IslamicApp,
    AboutPage,
    LoginPage,
    MapPage,
    SchedulePage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    ZakatcalcPage,
    PrayertimePage,
    QiblaPage,
    DuaPage,
    DuadetailsPage,
    NameofallahPage,
    SinglenamePage,
    TasbeehPage,
    HalalPlacesPage,
    CalendarPage,
    IslamicChannelPage,
    ShowvideoPage,
    SettingsPage,
    TimepreferencesPage,
    FeedbackPage,
    FormsPage,
    QuranPage
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
    LaunchNavigator,
    Geolocation,
    NativeGeocoder,
    SocialSharing,
    Network,
    LocalNotifications,
    Deeplinks
  ]
})
export class AppModule { }
