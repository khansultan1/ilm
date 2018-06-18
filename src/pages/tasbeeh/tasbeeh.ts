import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tasbeeh',
  templateUrl: 'tasbeeh.html',
})
export class TasbeehPage {
  counter:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasbeehPage');
  }
  incrementCount(){
    let audio = new Audio();
     audio.src = "./assets/audio/Click2.mp3";
     audio.load();
     audio.play();
  this.counter++;

}
resetCount(){
  
     let audio = new Audio();
     audio.src = "./assets/audio/Button_Push.mp3";
     audio.load();
     audio.play();
     this.counter=0;
}
}
