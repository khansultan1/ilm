import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Diagnostic } from '@ionic-native/diagnostic';
import { PrayertimePage } from '../prayertime/prayertime';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { TimeTableData } from '../../providers/timetable-data';
import {Quotes} from '../../model/qoutes';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { DuaPage } from '../dua/dua';
import { NameofallahPage } from '../nameofallah/nameofallah';
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
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
  locationData:any={};
  nextPrayerTime:any={time:"", text:""};
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
    public confData: TimeTableData,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation
  ) {  
        let errorCallback = (e) => {
          this.locationAccuracy.canRequest().then((canRequest: boolean) => {
    
            if(canRequest) {
              // the accuracy option will be ignored by iOS
              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                () => {
                console.log('Request successful')
               
              },
                error => console.log('Error requesting location permissions', error)
              );
            }
          })
        };
      let successCallback = (isAvailable) => {
     console.log('Is available? ' + isAvailable);
     if(isAvailable){
      this.getCurrentLocations();
     }else{
      this.enableLocation();
     }

    };
        this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
  }
  ionViewDidLoad() {
    this.getQuotes();
  }
  enableLocation()
  {
  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
  console.log(canRequest,'request..');
  if(canRequest) {
  // the accuracy option will be ignored by iOS
  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  () => console.log('Request successful'),
  error => console.log('Error requesting location permissions'+JSON.stringify(error))
  );
  }else{

    this.showConfirm();
  
  }
  
  });
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Use Location?',
      message: 'Location detection is disabled on your this device. Please check your settings.',
      buttons: [
        {
         
        },
        {
          text: 'Enable Location',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    confirm.present();
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
  getSchedule(lat,long) {    
    this.confData.load(lat,long).subscribe(data =>{
      this.tdData=data.data;
      this.getCurrentDateData();
   });

  }

  getCurrentDateData(){
    this.currentDateData = this.tdData.filter(res=>{
       return this.currentDate.getDate()==new Date(res.date.readable).getDate();
     });
     this.activeDateEn=this.currentDateData[0].date.hijri;
     this.activeDateEn.arabicDate=this.activeDateEn.weekday.ar + " "+  this.user.convertToArabic(this.activeDateEn.day) +" "+ this.activeDateEn.month.ar +" "+ this.user.convertToArabic(this.activeDateEn.year);
     this.activeDateEn.dayname=this.currentDateData[0].date.gregorian.weekday.en;
     this.activeDateEn.readable=this.currentDateData[0].date.readable;
     this.nextPrayerTime=this.getPrayrerTime(this.currentDateData[0].timings);

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
  getQuotes(){
    let quotes= new Quotes;
   let data=quotes.data.split(/\r?\n/);
   let random=Math.floor(Math.random() * 185);
   let qt=data[random].trim().split('|');
   this.qoutes['qoutes']=  qt[0].trim();
   this.qoutes['author'] = qt[1].trim();
   
  }
  getCurrentLocations(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.getSchedule(resp.coords['latitude'], resp.coords['longitude']);
      this.nativeGeocoder.reverseGeocode(resp.coords['latitude'], resp.coords['longitude'])
    .then((result: NativeGeocoderReverseResult) =>{
        console.log(result);
      this.locationData=result[0];
       console.log(this.locationData);
      })
    .catch((error: any) => console.log(error));
    })
  }
  getPrayrerTime(time){
    let currentTime=parseInt(new Date().getHours().toString() + new Date().getMinutes().toString());
    function nonNumaric(str){
      return parseInt(str.replace(/\D/g,''));
    }
    let setTime={} 
    if(currentTime <= nonNumaric(time.Fajr)){
      setTime={time:time.Fajr,text: 'Fajr'}
      }else if(currentTime > nonNumaric(time.Fajr) && currentTime <= nonNumaric(time.Dhuhr)){
        setTime={time:time.Dhuhr,text: 'Dhuhr'}
      }else if(currentTime > nonNumaric(time.Dhuhr) && currentTime <= nonNumaric(time.Asr)){
        setTime={time:time.Asr,text: 'Asr'}
      }else if(currentTime > nonNumaric(time.Asr) && currentTime <= nonNumaric(time.Maghrib)){
        setTime={time:time.Maghrib,text: 'Maghrib'}
      }else if(currentTime > nonNumaric(time.Maghrib) && currentTime <= nonNumaric(time.Isha)){
        setTime={time:time.Isha,text: 'Isha'}
      }else{
        setTime={time:time.Midnight,text: 'Midnight'}
      }
    return setTime;
  }
  goToPrayterTime(){
  this.navCtrl.push(PrayertimePage);
 
  }
  goToDuaPage(){
    this.navCtrl.push(DuaPage);
  }
  gotoNamepage(){
    this.navCtrl.push(NameofallahPage);
  }
}
