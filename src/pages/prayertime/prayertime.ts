import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, LoadingController } from 'ionic-angular';
import { TimeTableData } from '../../providers/timetable-data';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SettingsPage } from '../settings/settings';
import moment from 'moment';
// @IonicPage()
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
  loading:any;
  activeAlarm:any=localStorage.activeAlarm ?JSON.parse(localStorage.activeAlarm) :{}
  constructor(public loadCTRL: LoadingController, public localNofication: LocalNotifications, public navCtrl: NavController, public navParams: NavParams, public confData: TimeTableData,  public modalCtrl: ModalController, public geolocation:Geolocation  ) {
   this.loading=loadCTRL.create();
   this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrayertimePage');
  
  }
  ionViewWillEnter(){
    this.getSchedule();
  }
  getSchedule() {
    //let location=this.getLocation.getCurrentLocation();
     this.geolocation.getCurrentPosition().then((resp) => {

    this.confData.load(resp.coords['latitude'],resp.coords['longitude']).subscribe(data =>{
    
      this.tdData=data.data;
      this.getCurrentDateData();
      this.loading.dismiss();
   });
  })
  }

  getCurrentDateData(){
    this.currentDateData = this.tdData.filter(res=>{
       return this.currentDate.getDate()==new Date(res.date.readable).getDate();
     });
     this.activeDateEn=this.currentDateData[0].date.hijri;
     this.activeDateEn.dayname=this.currentDateData[0].date.gregorian.weekday.en;
     this.activeDateEn.readable=this.currentDateData[0].date.readable;
     this.currentDateData.timing=[];
     let count=0;
     for(var x in this.currentDateData[0].timings){
       if(x !='Sunset' &&  x !='Sunrise' && x !='Imsak' && x !='Midnight'){
      this.currentDateData.timing.push({name:x, value:this.currentDateData[0].timings[x], count:count})
        count++;
    }
      }
      console.log(this.currentDateData);
   }
   
  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      
    });

  }
  setAlarm(name, time){
      this.activeAlarm[name]='active';
      localStorage.activeAlarm = JSON.stringify(this.activeAlarm);
      let nTime= time.replace(/[a-zA-Z\(\)\/ " "]/g,"");
     // nTime="22:35"
      let d1 = moment(nTime, 'HH:mm');
      // let now = moment(new Date()).format('HH:mm');
      // let end = moment(d1).format('HH:mm');
    let diff=moment.duration(d1.diff(moment(new Date())))
    let milliseconds= diff['_milliseconds'];
    if(milliseconds <1){
      diff=moment.duration(d1.diff(moment(d1.diff(new Date(moment(new Date()).add(1,'days').format('MM/DD/YYYY') +" "+nTime)))))
      milliseconds=diff['_milliseconds'];
    }
    console.log(diff.asHours(), diff.asSeconds())
    console.log(d1.unix())
     // moment(moment(startTime,"hh:mm").diff(moment(endTime,"hh:mm"))).format("hh:mm");
    this.localNofication.schedule({
      id:name,
      title: "Ilm-e-Islam",
      text: "Salah Time "+name ,
      trigger: {at: new Date(new Date().getTime()+ milliseconds)},
      sound: 'azan',
      vibrate:true,
      every:'day',
  });
  }
  settingsPage(){
this.navCtrl.push(SettingsPage);
  }
  removeAlarm(name){
    delete this.activeAlarm[name];
    localStorage.activeAlarm = JSON.stringify(this.activeAlarm);
    this.localNofication.clear(name);
  }
}
