import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

/**
 * Generated class for the SinglenamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-singlename',
  templateUrl: 'singlename.html',
  
})
export class SinglenamePage {
  name:any={};
  background:any=[];
  public url: SafeResourceUrl;
  public backgroundUrl:SafeResourceUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
   
    this.getName();
    this.background=[1,2,3,4,5,6,7,8];
    this.changeBackground(1);
  }

  getName(){
    this.name=this.navParams.get('key');
    this.name['ar']=this.name['ar'].replace('(', '').replace(')', '');
  }
  changeBackground(id){
    let url= this.domSanitizer.bypassSecurityTrustUrl('./assets/img/'+id+'-background.jpg');
    this.backgroundUrl=url['changingThisBreaksApplicationSecurity'];
  }
  getImage(num){
    let u= './assets/img/'+num+'-background.jpg'
    this.url= this.domSanitizer.bypassSecurityTrustUrl(u);
    return this.url['changingThisBreaksApplicationSecurity'];
  }
  
}
