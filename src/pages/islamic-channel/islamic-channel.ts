import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowvideoPage } from '../showvideo/showvideo';

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
  channelList:any=[{
    channelId:'UCCif7uiJJKqzDDGPsSVzJSw',
    name:'Live Mecca',
    url:'',
    icon:'./assets/img/kaaba.png'
  },
  {
  channelId:'UCCif7uiJJKqzDDGPsSVzJSw',
    name:'Live Madina',
    url:'',
    icon:'./assets/img/kaaba.png'
  },
  {
  channelId:'UCCif7uiJJKqzDDGPsSVzJSw',
  name:'Madni Channel',
  url:'',
  icon:'./assets/img/kaaba.png'
  },
  {
  channelId:'UCCif7uiJJKqzDDGPsSVzJSw',
  name:'Islam Channel',
  url:'',
  icon:'./assets/img/kaaba.png'
  }
]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  

  }

  ionViewDidLoad() {
    // let options: StreamingVideoOptions = {
    //   successCallback: () => { console.log('Video played') },
    //   errorCallback: (e) => { console.log('Error streaming', e) },
    //   orientation: 'landscape'
    // };
    
    // this.streamingMedia.playVideo('https://www.youtube.com/embed/live_stream?channel=UCCif7uiJJKqzDDGPsSVzJSw', options);
  }
openChannel(channelId){
  this.navCtrl.push(ShowvideoPage,{
    channelId:channelId
  });
}
}

