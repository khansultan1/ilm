import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;
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
   map:any;
   directionpositon:any;
   currentLatLng:any={};
   @ViewChild('qiblamap') mapElement: ElementRef;
   @ViewChild('direction') directionElem: ElementRef;
   @ViewChild('directionCont') directionCont: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public deviceOrientation: DeviceOrientation, private modalCtrl:ModalController, public geolocation:Geolocation) {
  
    
    //subscription.unsubscribe();
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QiblaPage');
    this.loadMap();
  }
  orientation(){
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {

      },
      (error: any) => console.log(error)
    );

    var subscription = this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {

        let directionCont = this.directionCont.nativeElement;
        directionCont.style.transform = "rotate("+data.trueHeading+"deg)";
        var bearing = this.getBearing(this.klat,this.klong,this.currentLatLng['latitude'],this.currentLatLng['longitude']);
                      this.rotateAnimation(bearing);
                  
                                
      });
  }
  loadMap(){
  
    let mapEle = this.mapElement.nativeElement;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLatLng=resp.coords;
    var pyrmont = {lat: resp.coords['latitude'], lng: resp.coords['longitude']};
      
     this.map = new google.maps.Map(mapEle, {
      center: pyrmont,
      zoom: 2
    });
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.klat , this.klong),
      map: this.map,
      icon: './assets/img/kaaba.png'
  });
  var lineCoordinates = [
    new google.maps.LatLng(resp.coords['latitude'],resp.coords['longitude']),
    new google.maps.LatLng(this.klat,this.klong)
];
// Define the symbol, using one of the predefined paths ('CIRCLE')
// supplied by the Google Maps JavaScript API.
var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 3,
    strokeColor: '#393'
};

// Create the polyline and add the symbol to it via the 'icons' property.
let line = new google.maps.Polyline({
    path: lineCoordinates,
    icons: [{
            icon: lineSymbol,
            offset: '100%'
        }],
    geodesic:true,
    strokeColor:'#393',
    map: this.map
});
animateCircle(line);
function animateCircle(line) {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 200;

    var icons = line.get('icons');
    icons[0].offset = (count / 2) + '%';
    line.set('icons', icons);
}, 20);
}
var bearing = this.getBearing(this.klat,this.klong,resp['latitude'],resp['longitude']);
this.currentLatLng['positondeg']=bearing; 
this.rotateAnimation(bearing);
this.orientation();



  })

  }
   getBearing(klat,klong,lat,long){   
    return (this.rad2deg(Math.atan2(Math.sin(this.deg2rad(klong) - this.deg2rad(long)) * Math.cos(this.deg2rad(klat)), Math.cos(this.deg2rad(lat)) * Math.sin(this.deg2rad(klat)) - Math.sin(this.deg2rad(lat)) * Math.cos(this.deg2rad(klat)) * Math.cos(this.deg2rad(klong) - this.deg2rad(long)))) + 360) % 360;
  }
  
   deg2rad(angle) {     
    return (angle / 180) * Math.PI; //angle * .017453292519943295; // 
  }
   rad2deg(angle) {   
    return angle / Math.PI * 180; //angle * 57.29577951308232; // angle / Math.PI * 180
  }
   rotateAnimation(degrees){    
    let direcEle = this.directionElem.nativeElement;
    
    direcEle.style.transform = "rotate("+degrees+"deg)";
  
  }
  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
     
    });

  }



}
