import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';


/**
 * Generated class for the QiblaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qibla',
  templateUrl: 'qibla.html',
  providers:[DeviceOrientation]
})
export class QiblaPage {
   lat:any = 0;
   long:any = 0;
   klat:any = 21.423063 ;
   klong:any = 39.825951 ;
   clat:any = this.klat;
   clong = this.klong;   
  //  private elementRef: ElementRef;
  //  @ViewChild('arrow') set controlElRef(elementRef: ElementRef) {
  //    this.elementRef = elementRef;
  //  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public deviceOrientation: DeviceOrientation) {
  
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
        console.log(data);

      },
      (error: any) => console.log(error)
    );

    var subscription = this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => console.log(data)
    );
    subscription.unsubscribe();
   // console.log(this.elementRef);
  //   var oc = this.elementRef.nativeElement.getElementById('arrow');
  // console.log(oc);      

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QiblaPage');
  }

  

  
  // Get the device current compass heading
 
  
  // Watch the device compass heading change

  
  // Stop watching heading change



}
