import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { TimeTableData } from '../../providers/timetable-data';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { Geolocation } from '@ionic-native/geolocation';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: TimeTableData,  public modalCtrl: ModalController, public geolocation:Geolocation  ) {
    this.getSchedule();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrayertimePage');
  
  }
  getSchedule() {
    //let location=this.getLocation.getCurrentLocation();
     this.geolocation.getCurrentPosition().then((resp) => {

    this.confData.load(resp.coords['latitude'],resp.coords['longitude']).subscribe(data =>{
    
      this.tdData=data.data;
      this.getCurrentDateData();
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
}
