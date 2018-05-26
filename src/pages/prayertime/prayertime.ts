import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeTableData } from '../../providers/timetable-data';

@IonicPage()
@Component({
  selector: 'page-prayertime',
  templateUrl: 'prayertime.html',
})

export class PrayertimePage {
  tdData:any;
  currentDate:any=new Date();
  currentDateData:any=[];
  activeDateEn:any={};
  confDate: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: TimeTableData) {
    this.getSchedule();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrayertimePage');
  
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
    this.confData.load(1212.31342,12312.23).subscribe(data =>{
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
}
