import { Component, ViewChild, ElementRef, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Platform,ModalController } from 'ionic-angular';
import { GetLocation } from '../../providers/getcurrentlocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage {
  currentLatLng:any;
  map:any;
  placeObj:any={}
  source: any = [] // source lat,long
destination: any =  [] // dest lat,long

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public platform: Platform,  public getLocation:GetLocation,private ref: ChangeDetectorRef, private launchnavigator:LaunchNavigator, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
        this.initMap();
  }
  initMap() {
    let that=this;
    let mapEle = this.mapElement.nativeElement;
    let location=this.getLocation.getCurrentLocation();
    location.then(resp=>{
     this.currentLatLng= resp;
    var pyrmont = {lat: resp['latitude'], lng: resp['longitude']};
      
     this.map = new google.maps.Map(mapEle, {
      center: pyrmont,
      zoom: 15
    });

   let infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
      location: pyrmont,
      radius: 3000,
      type: ['mosque']
    }, callback);
  })
  function callback(results, status) {
    
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         that.createMarker(results[i]);
       }
     }
   }
  }
   
createMarker(place) {
    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      icon: './assets/img/map-icon.png',
    });
 
    google.maps.event.addListener(marker, 'click',()=>{
      console.log(place);
      this.placeObj=place;
      let distance=this.calculateDistance(placeLoc.lat(),this.currentLatLng.latitude,placeLoc.lng(), this.currentLatLng.longitude)
      this.placeObj.distance=distance.toFixed(2);
      console.log(distance);
      this.ref.detectChanges();
      this.source.push(this.currentLatLng.latitude, this.currentLatLng.longitude);
      this.destination.push(this.placeObj.geometry.location.lat(), this.placeObj.geometry.location.lng())
    })
  }
  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

navigate(){
let options: LaunchNavigatorOptions = {
   start: this.source
};

 this.launchnavigator.navigate(this.destination, options)
   .then(
    success => alert('Launched navigator'),
    error => alert('Error launching navigator: ' + error)
 );
}
presentFilter() {
  let modal = this.modalCtrl.create(ScheduleFilterPage);
  modal.present();

  modal.onWillDismiss((data: any[]) => {
    
  });

}
}
