import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dua} from '../../model/dua'
/**
 * Generated class for the DuadetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-duadetails',
  templateUrl: 'duadetails.html',
})
export class DuadetailsPage {
  Dua:any;
  duaname:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.duaname=this.navParams.get('key');
  }

  ionViewDidLoad() {
    this.getDetails();
  }
getDetails(){
  let dua=new Dua;
  this.Dua=dua.data[this.duaname];
  console.log(this.Dua);

}
}
