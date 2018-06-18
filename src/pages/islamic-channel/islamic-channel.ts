import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
/**
 * Generated class for the IslamicChannelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-islamic-channel',
  templateUrl: 'islamic-channel.html',
})
export class IslamicChannelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private streamingMedia: StreamingMedia) {
  }

  ionViewDidLoad() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming', e) },
      orientation: 'landscape'
    };
    
    this.streamingMedia.playVideo('https://www.youtube.com/watch?v=WVZpCdHq3Qg ', options);
  }

}
