import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the ShowvideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-showvideo',
  templateUrl: 'showvideo.html',
})
export class ShowvideoPage {
  trustedVideoUrl: SafeResourceUrl;
  name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private domSanitizer: DomSanitizer) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowvideoPage');
   let channel= this.navParams.get('channelId');
    this.name= this.navParams.get('name');
   let url='https://www.youtube.com/embed/';
   this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url+channel);
  }

}
