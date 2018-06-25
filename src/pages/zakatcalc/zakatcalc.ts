import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // Keyboard.show() // for android
    // setTimeout(() => {
    //   this.autofocus.setFocus();
    // },250)
  }
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
let total= parseInt(f.value.bank_account_value)+parseInt(f.value.silver_value)+parseInt(f.value.bank_account_value)+parseInt(f.value.f_deposite_value)+parseInt(f.value.loan_amount)+parseInt(f.value.investment_Value)
let liabilities=parseInt(f.value.borrowd_value)+parseInt(f.value.utilities_Value)
let due=total-liabilities;
let final=((2.5*due)/100)
this.showAlert(final)
  }
  showAlert(due) {
    const alert = this.alertCtrl.create({
      title: 'Zakat Due!',
      subTitle: 'Your total due zakat is:'+due,
      buttons: ['OK']
    });
    alert.present();
  }
}
