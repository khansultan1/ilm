import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dua} from '../../model/dua';
/**
 * Generated class for the DuaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dua',
  templateUrl: 'dua.html',
})
export class DuaPage {
  dua:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuaPage');
    this.getDua()
  }
  getDua(){
 let dua=new Dua;
 this.dua=dua.data['1']['Kalimah Tayyibah'];
 console.log(this.dua);
  }

}
