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
    channelId:'qlJZ6uPq4ZQ',
    name:'Live Mecca',
    url:'',
    icon:'./assets/img/kaaba.png'
  },
  {
  channelId:'1558yU02-xQ',
    name:'Live Madina',
    url:'',
    icon:'./assets/img/madina.png'
  },
  // {
  // channelId:'b9SqXdWllkQ',
  // name:'Madni Channel',
  // url:'',
  // icon:'./assets/img/madani.jpg'
  // },
  // {
  // channelId:'siFtHoPcdio',
  // name:'MTA TV',
  // url:'',
  // icon:'./assets/img/mta.jpg'
  // },

  // {
  //   channelId:'tNDUyKiAGE',
  //   name:'Eman Channel',
  //   url:'',
  //   icon:'./assets/img/eman.jpg'
  //   },
  
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
openChannel(channelId,name){
  this.navCtrl.push(ShowvideoPage,{
    channelId:channelId,
    name:name
  });
}
}

