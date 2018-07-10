import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dua} from '../../model/dua'
import { DuadetailsPage } from '../duadetails/duadetails';
/**
 * Generated class for the DuaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dua',
  templateUrl: 'dua.html',
})
export class DuaPage {
  dua:any={};
  dualabel:any=[];
  duaSearch:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuaPage');
    this.getDua()
  }
  getDua(){
 let dua=new Dua;
 this.dua=dua.data;
this.dualabel=Object.keys(this.dua);

  }
  goToDetailPage(name){
    this.navCtrl.push(DuadetailsPage,{
      key:name
    });
  }
searchDuaText(input){
  let text=input.target.value ? input.target.value.toLowerCase() : "";
  this.dualabel= Object.keys(this.dua).filter((a,b)=>{
    return ((a.toLowerCase().indexOf(text) > -1) || text.data=="")
})

}
}
