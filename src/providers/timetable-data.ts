import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Storage } from '@ionic/storage';
import {defaultSettings} from '../model/defaultsettings';
@Injectable()
export class TimeTableData {
  data: any;
  surah:any;
  selectedSurah:any;
  constructor(public http: Http, public user: UserData, public storage: Storage) { }

  load(lat,long): any {
    
    if (this.data) {
      return Observable.of(this.data);
    } else {
    
      let method=localStorage.method ?localStorage.method :new defaultSettings().settings.method;
      let jschool=localStorage.jschool ?localStorage.jschool :new defaultSettings().settings.j_school;
      return this.http.get('http://api.aladhan.com/v1/calendar?latitude='+lat+'&longitude='+long+'&method='+method+'&school='+jschool)
        .map(this.processData, this);
      
     
    }
  }
  getCalendar(month,year){
   
      return this.http.get('http://api.aladhan.com/gToHCalendar/'+month+'/'+year)
        .map(this.processData, this);
  }

  processData(data: any) {
    return  this.data = data.json();
  }
  processSurah(data:any){
    return  this.surah = data.json();
  }
  getSurah(){
    if (this.surah) {
      return Observable.of(this.surah);
    } else {
  
      return this.http.get('http://api.alquran.cloud/surah')
        .map(this.processSurah, this);
      
     
    }
  }
  processSelected(data:any){
    return  this.selectedSurah = data.json();
  }
  getSurahFrom(surahNumber:any, language, from){
    if (this.selectedSurah) {
      return Observable.of(this.selectedSurah);
    } else {
  
      return this.http.get('http://api.alquran.cloud/surah/'+surahNumber+'/'+language+'.'+from)
        .map(this.processSurah, this);
      
     
    }
  }
}
