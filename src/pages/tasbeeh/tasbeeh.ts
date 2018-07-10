import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
// @IonicPage()
@Component({
  selector: 'page-tasbeeh',
  templateUrl: 'tasbeeh.html',
  providers:[Vibration]
})
export class TasbeehPage {
  counter:number=0;
  tCount:any=null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private vibration: Vibration) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasbeehPage');
  }
  incrementCount(){
    if(this.counter==this.tCount){
      this.vibration.vibrate(100);
      return;
    }
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
setCount(num){
  this.counter=0;
  this.tCount=num;
}
}
