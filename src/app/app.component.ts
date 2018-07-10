import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, NavController, ToastController,App, AlertController,IonicApp } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/mosque-near/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { SchedulePage } from '../pages/schedule/schedule';
import { TimeTableData } from '../providers/timetable-data';
import { UserData } from '../providers/user-data';
import { DuaPage } from '../pages/dua/dua';
import { NameofallahPage } from '../pages/nameofallah/nameofallah';
import { TasbeehPage } from '../pages/tasbeeh/tasbeeh';
import { ZakatcalcPage } from '../pages/zakatcalc/zakatcalc';
import { HalalPlacesPage } from '../pages/halal-places/halal-places';
import { CalendarPage } from '../pages/calendar/calendar';
import { IslamicChannelPage } from '../pages/islamic-channel/islamic-channel';
import { PrayertimePage } from '../pages/prayertime/prayertime';
import { QuranPage } from '../pages/quran/quran';
import { Network } from '@ionic-native/network';
import { Deeplinks } from '@ionic-native/deeplinks';
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class IslamicApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'calendar' },
    { title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
 
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;


  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: TimeTableData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public network: Network,
    public toastCtrl: ToastController,
    public app: App,
    public alertCtrl: AlertController,
    public ionicApp: IonicApp,
    private deeplinks: Deeplinks
  ) {

    

    // Check if the user has already seen the tutorial
    // this.storage.get('hasSeenTutorial')
    //   .then((hasSeenTutorial) => {
    //     if (hasSeenTutorial) {
    //       this.rootPage = TabsPage;
    //     } else {
          this.rootPage = TabsPage;
        //}
        this.platformReady()
     // });

    // load the conference data
    //confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }
  initializeApp(){
    console.log("app init..");
  }
  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  // openTutorial() {
  //   this.nav.setRoot(TutorialPage);
  // }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      console.log();
      this.splashScreen.hide();
      this.platform.ready().then(() => {
        if (this.platform.is('ios')) {
          // change 000 to whatever you need
           window['plugins'].webviewcolor.change('#000000');
        }
      })
     
     
      let disconnectSub = this.network.onDisconnect().subscribe(() => {
        console.log('you are offline');
        alert("Please connect to the internet");
      });
      
      let connectSub = this.network.onConnect().subscribe(()=> {
        console.log('you are online');
      });

    });

    this.deeplinks.routeWithNavController(this.nav, {
      '/about-us': AboutPage,
      '/map-page': MapPage,
      '/shedule-page': SchedulePage,
      '/time-table': TimeTableData,
      '/dua-page': DuaPage,
      '/nameofallahPage': NameofallahPage,
      '/tasbeehPage': TasbeehPage,
      '/zakat-calculator': ZakatcalcPage,
      '/halal-places': HalalPlacesPage,
      '/calendar': CalendarPage,
      '/islamicChannelPage': IslamicChannelPage,
      '/PrayertimePage': PrayertimePage,
      '/QuranPage': QuranPage,
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('Successfully matched route', match);
    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });

  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
  goToPrayterTime(){
    this.nav.push(PrayertimePage);
    this.menu.close();
    }
    goToDuaPage(){
      this.nav.push(DuaPage);
      this.menu.close();
    }
    gotoNamepage(){
      this.nav.push(NameofallahPage);
      this.menu.close();
    }
    gotoTasbeeh(){
      this.nav.push(TasbeehPage);
      this.menu.close();
    }
    goToZakatPage(){
      this.nav.push(ZakatcalcPage);
      this.menu.close();
    }
    gotohalalPlace(){
      this.nav.push(HalalPlacesPage);
      this.menu.close();
    }
    gotoCalendar(){
      this.nav.push(CalendarPage);
      this.menu.close();
    }
    gotoIslamicChannel(){
      this.nav.push(IslamicChannelPage);
      this.menu.close();
    }
    quranPage(){
      this.nav.push(QuranPage);
      this.menu.close();
    }
}
