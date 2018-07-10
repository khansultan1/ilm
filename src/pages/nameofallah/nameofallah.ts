import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Name } from '../../model/nameofallah';
import { SinglenamePage } from '../singlename/singlename';
/**
 * Generated class for the NameofallahPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-nameofallah',
  templateUrl: 'nameofallah.html',
})
export class NameofallahPage {
  Names:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getNames();
  }

  getNames(){
    let names= new Name;
    for(var name in names.data){
      this.Names.push(names.data[name]);
    }
  }
  selectedName(name){
    this.navCtrl.push(SinglenamePage,{
      key:name
    });
  }

}
