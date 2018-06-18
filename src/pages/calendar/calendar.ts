
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";

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
  monthNames: string[];
  selectedInvite: any;
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  lastDragEventToken: number;
  activeDate: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}

  ionViewDidLoad() {

    this.date = new Date();
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.getDaysOfMonth();
    //this.getCalendarDetails(this.date.getMonth()+1, this.date.getFullYear());
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
    for (let i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
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
  // checkeEvent(day, type) {
  //   let flag = false;
  //   flag = this.currentMonthInvites.some((invite, index) => {
  //     if (new Date(invite.datetime).getDate() == day && invite.type == type) {
  //       return true;
  //     }
  //   });
  //   return flag;
  // }
  /*
goToLastMonth() {
  this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
  this.getDaysOfMonth();
}

*/

  goToNextMonth() {
    this.currentMonth = this.monthNames[this.slides.getActiveIndex()];

    this.date = new Date(
      this.date.getFullYear(),
      this.slides.getActiveIndex() + 1,
      0
    );
    this.getDaysOfMonth();
  
  }
  slideDrag(event?: any) {
    if (this.lastDragEventToken) {
      window.clearTimeout(this.lastDragEventToken);
    }
    this.lastDragEventToken = window.setTimeout(() => {
      this.goToNextMonth();

      window.clearTimeout(this.lastDragEventToken);
      this.lastDragEventToken = 0;
    }, 300);
  }
  

  getCalendarDetails(month, year) {
    var data = { month: month, year: year };
    //this.calendarModel=[{"id":30,"type":"private","host":{"user_id":21,"name":"ad","avatar":""},"datetime":"2018-04-04 00:03:00","place":{"place_id":7,"name":"The Blue Roof Club","logo":"https:\/\/maps.gstatic.com\/mapfiles\/place_api\/icons\/bar-71.png"}}]

 
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
   this.currentMonth=this.slides.getActiveIndex()+1;
   this.goToNextMonth();
  }
}
