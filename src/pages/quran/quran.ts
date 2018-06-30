import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeTableData } from '../../providers/timetable-data';
/**
 * Generated class for the QuranPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quran',
  templateUrl: 'quran.html',
})
export class QuranPage {
  surah:any=[];
  selectedSurah:any=1;
  language:any='ar';
  from:any='asad';
  SurahDetails:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public quranData:TimeTableData) {
    this.loadSurah();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuranPage');
  }
loadSurah(){
  this.quranData.getSurah().subscribe(data =>{
    this.surah=data.data;
    console.log(this.surah);
    this.loadSeletedSurah();
 });
}
loadSeletedSurah(){
  this.quranData.getSurahFrom(this.selectedSurah, this.language, this.from).subscribe(data =>{
    this.SurahDetails=data.data;
    console.log(this.SurahDetails);
 });
}
}
