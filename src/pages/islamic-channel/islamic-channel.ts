import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private youtube: YoutubeVideoPlayer) {
  }

  ionViewDidLoad() {
    this.youtube.openVideo('zsZf4wnggz8');
  }

}
