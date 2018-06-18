import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from '@angular/forms';
/**
 * Generated class for the ZakatcalcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var Keyboard:any;
@IonicPage()
@Component({
  selector: 'page-zakatcalc',
  templateUrl: 'zakatcalc.html',
})

export class ZakatcalcPage {
  @ViewChild('zakatform')
  private myForm: NgForm;
  @ViewChild('autofocus') autofocus;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    Keyboard.show() // for android
    setTimeout(() => {
      this.autofocus.setFocus();
    },250)
  }
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
