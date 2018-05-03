import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { TimeTableData } from '../../providers/timetable-data';
import {Quotes} from '../../model/qoutes';
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  providers:[Diagnostic]
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  tdData:any;
  currentDate:any=new Date();
  currentDateData:any=[];
  activeDateEn:any={};
  confDate: string;
  qoutes:any={};
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public user: UserData,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    public confData: TimeTableData
  ) {  
      this.enableLocation();
      this.getSchedule();
        this.getQuotes();
  }
  ionViewDidLoad() {
 
  }
  enableLocation()
  {
  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
  console.log(canRequest,'request..');
  if(canRequest) {
  // the accuracy option will be ignored by iOS
  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  () => alert('Request successful'),
  error => alert('Error requesting location permissions'+JSON.stringify(error))
  );
  }
  
  });
  }
  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        //this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
  }
  getSchedule() {
    // Close any open sliding items when the schedule updates
    // this.scheduleList && this.scheduleList.closeSlidingItems();
    // let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
    // let errorCallback = (e) => {
    //   this.locationAccuracy.canRequest().then((canRequest: boolean) => {

    //     if(canRequest) {
    //       // the accuracy option will be ignored by iOS
    //       this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    //         () => console.log('Request successful'),
    //         error => console.log('Error requesting location permissions', error)
    //       );
    //     }
    //   })
    // };
    
    // this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
    
    // // only android
    // this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);
    this.confData.load().subscribe(data =>{
      this.tdData=data.data;
      this.getCurrentDateData();
   });

  }

  getCurrentDateData(){
    this.currentDateData = this.tdData.filter(res=>{
       return this.currentDate.getDate()==new Date(res.date.readable).getDate();
     });
     this.activeDateEn=this.currentDateData[0].date.hijri;
     this.activeDateEn.dayname=this.currentDateData[0].date.gregorian.weekday.en;
     this.activeDateEn.readable=this.currentDateData[0].date.readable;
     console.log(this.currentDateData);
   }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
           // this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
  getQuotes(){
    let quotes= new Quotes;
   let data=quotes.data.split(/\r?\n/);
   let random=Math.floor(Math.random() * 185);
   let qt=data[random].trim().split('|');
   this.qoutes['qoutes']=  qt[0]
   this.qoutes['author'] = qt[1];
   
  }
}
