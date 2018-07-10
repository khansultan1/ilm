import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {defaultSettings} from '../../model/defaultsettings';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  radiusValue:number;
  zoomLevels: Array<any> = [1,3,5,10];
  zoomRanges: Array<any> = [5,10,15,20];
  zoomrangeValue:number;
    default:any;
    method:any;
    j_school:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.default=new defaultSettings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.zoomrangeValue=localStorage.zoomrange ? localStorage.zoomrange : this.default.settings.zoomLevel;
    this.radiusValue=localStorage.zoomradius ? localStorage.zoomradius :this.default.settings.mapRadius/1000;
    this.method=localStorage.method ? localStorage.method: new defaultSettings().settings.method;
    this.j_school=localStorage.jschool ? localStorage.jschool : new defaultSettings().settings.j_school;
  }
  writeValue(range: any) {
    if (range !== undefined) {
      this.radiusValue = range;
    }
  }
  resetZoomRadius(zoomradius):void{
    this.radiusValue = zoomradius;
    localStorage.zoomradius=zoomradius;
  }
  resetZoomRange(value){
    this.zoomrangeValue=value;
    localStorage.zoomrange=value;
  }
  onZoomRadius($event){
    this.radiusValue =$event.value;
    localStorage.zoomradius=$event.value;
  }
  onZoomRange($event){
    this.zoomrangeValue=$event.value;
    localStorage.zoomrange=this.zoomrangeValue;
  }
  saveMethod(){
    console.log(this.method);
    localStorage.method=this.method;
  }
  saveJSchool(){
    localStorage.jschool=this.j_school;
    console.log(this.j_school);
  }
}
