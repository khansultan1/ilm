
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides,LoadingController } from "ionic-angular";
import { TimeTableData } from '../../providers/timetable-data';
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calendar",
  templateUrl: "calendar.html"
})
export class CalendarPage {
  @ViewChild(Slides) slides: Slides;
  date: any = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: any[];
  selectedInvite: any;
  currentYear: any;
  currentDate: any;
  lastDragEventToken: number;
  activeDate: any;
  tdData:any;
  eventList:any[];
  holidayes:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public confData: TimeTableData,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    
        
    this.date = new Date();
    this.getSchedule(this.date.getMonth()+1,this.date.getFullYear());

    this.monthNames = [
      {en:"January",ar:""},
      {en:"February",ar:""},
      {en:"March",ar:""},
      {en:"April",ar:""},
      {en:"May",ar:""},
      {en:"June",ar:""},
      {en:"July",ar:""},
      {en:"August",ar:""},
      {en:"September",ar:""},
      {en:"October",ar:""},
      {en:"November",ar:""},
      {en:"December",ar:""}
    ];

  }
  slideChanged() {
    this.goToNextMonth();
  }
  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();

    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    let firstDayThisMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1
    ).getDay();
    let prevNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    ).getDate();
    for (
      let i = prevNumOfDays - (firstDayThisMonth - 1);
      i <= prevNumOfDays;
      i++
    ) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
    console.log(thisNumOfDays);
    for (let i = 0; i < thisNumOfDays; i++) {
        var ar=this.tdData[i].hijri;
        let date=ar.day+ ' '+ ar.month['ar'];
        let holidays=ar.holidays.length>0;
      this.daysInThisMonth.push({en:i + 1, ar:date, holidays:holidays});
    }

    var lastDayThisMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDay();
    var nextNumOfDays = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 2,
      0
    ).getDate();
    for (let i = 0; i < 6 - lastDayThisMonth; i++) {
      this.daysInNextMonth.push(i + 1);
    }
    let totalDays =
      this.daysInLastMonth.length +
      this.daysInThisMonth.length +
      this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var i = 7 - lastDayThisMonth; i < 7 - lastDayThisMonth + 7; i++) {
        this.daysInNextMonth.push(i);
      }
    }
    this.getCalendarDetails(this.date.getMonth() + 1, this.date.getFullYear());
  }

  goToNextMonth() {
    this.date = new Date(
      this.date.getFullYear(),
      this.slides.getActiveIndex() + 1,
      0
    );
    this.getSchedule( this.slides.getActiveIndex() + 1,this.date.getFullYear())
    //this.getDaysOfMonth();
  
  }
  slideDrag(event?: any) {
    if (this.lastDragEventToken) {
      window.clearTimeout(this.lastDragEventToken);
    }
    this.lastDragEventToken = window.setTimeout(() => {
      this.getSchedule( this.slides.getActiveIndex() + 1,this.date.getFullYear())

      window.clearTimeout(this.lastDragEventToken);
      this.lastDragEventToken = 0;
    }, 300);
  }
  

  getCalendarDetails(month, year) {
    var data = { month: month, year: year };
  }
  toggleInvite(invite) {
    if (this.selectedInvite === invite) {
      this.selectedInvite = [];
    } else {
      this.selectedInvite = invite;
    
    }
  }
 
  transition(event){
   if(event.direction==2){
    this.slides.slideNext();
   }else{
    this.slides.slidePrev();
   }
   this.goToNextMonth();
  }
  getHolidays(){
    this.holidayes=this.tdData.filter((a,b)=>{
      if(a.hijri.holidays.length>0)
      return a.hijri.holidays;
    });
    console.log(this.holidayes);
  }
  getSchedule(month,year) {  
    let loading = this.loadingCtrl.create();
    loading.present();  
    this.confData.getCalendar(month,year).subscribe(data =>{
      this.tdData=data.data;
 
      this.getDaysOfMonth();
      this.getHolidays();
      loading.dismiss();  
   });

  }
  events(day){

    this.eventList=this.holidayes.filter((a,b)=>{
      return parseInt(day.en)==parseInt(a.gregorian['day']);
    });
    console.log(this.eventList);
  }
}
