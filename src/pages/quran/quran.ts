import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TimeTableData } from '../../providers/timetable-data';
import { UserData } from '../../providers/user-data';

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
  SurahDetails:any={ar:{},en:{}};
  audio:any;
  isPlay:boolean=false;
  loader:any;
  constructor(public loadCTRL: LoadingController, public navCtrl: NavController, public navParams: NavParams, public quranData:TimeTableData, public userdata:UserData) {

   // this.audio= this.userdata.getQuranAudio();
    
   // this.isPlay = this.audio ? true :false;
    this.SurahDetails = this.userdata.getSurahDetails();
    this.surah=this.userdata.getSelectSurah();
    this.selectedSurah= this.SurahDetails['selected'] ? this.SurahDetails['selected'] : 1;
    if(this.surah.length==0){
     this.loadSurah();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuranPage');
  }
  ionViewWillLeave(){
    this.userdata.setQuranAudio(this.audio);
    this.audio.pause();
    this.audio=null;
  }
loadSurah(){
  
  let loader = this.loadCTRL.create();
  loader.present();
  this.quranData.getSurah().subscribe(data =>{
    this.surah=data.data;
    this.userdata.setSelectSurah(this.surah);
    loader.dismiss();
    this.loadSeletedSurah();
 });
}
loadSeletedSurah(){
 
  this.loader = this.loadCTRL.create();
  this.loader.present();
  this.quranData.getSurahFrom(this.selectedSurah, this.language, this.from).subscribe(data =>{
    this.SurahDetails['ar']=data.data;
    this.quranData.getSurahFrom(this.selectedSurah, 'en', this.from).subscribe(data =>{
    this.SurahDetails['en']=data.data;
    this.SurahDetails['selected']=this.selectedSurah; 
    this.userdata.setSurahDetails(this.SurahDetails)
    this.loader.dismiss();
    if(this.audio){
    this.audio.pause();
    this.audio =undefined;
    this.isPlay=false;
    }
  })
 });
}
convertToDigit(num){
return this.userdata.convertToArabic(num);
}
play(num){
  this.isPlay=true;
  if(this.audio && !num){
    this.audio.play();
    return;
  } 
  let numNext = num ? parseInt(num) : 0;
  let ayahNum= this.SurahDetails['ar'].ayahs[numNext].number;
  this.audio =  new Audio();
 this.audio.src = "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/"+ayahNum+"/high";
 this.audio.load();
  this.audio.play();

  let successCB=()=>{
    this.audio.pause();
    this.audio=null;
   let n= this.SurahDetails['ar'].ayahs[numNext+1] ? numNext+1 : '0'
   this.play(n);
  }
  this.audio.onended=successCB;
}
pause(){
  this.isPlay=false;
  this.audio.pause();
}
getTranslation(index){
  return  this.SurahDetails['en'].ayahs ? this.SurahDetails['en'].ayahs[index] : {};
}

}
