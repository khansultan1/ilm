import { Component, ViewChild, ElementRef } from '@angular/core';

//import { TimeTableData } from '../../providers/timetable-data';

import { Platform } from 'ionic-angular';


declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public platform: Platform) {
  }

  ionViewDidLoad() {

      // this.confData.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

       // let map = new google.maps.Map(mapEle, { });

        // mapData.forEach((markerData: any) => {
        //   let infoWindow = new google.maps.InfoWindow({
        //     content: `<h5>${markerData.name}</h5>`
        //   });

        // let posMaceio = { lat: -9.648139, lng: -35.717239 }
        // let map = new google.maps.Map(mapEle, {
        //     zoom: 8,
        //     center: posMaceio,
        //     mapTypeId: 'roadmap'
        // });
        // map.setCenter(posMaceio);
        var infowindow=null;
        var map=null;
        function initMap() {
          var pyrmont = {lat: 19.218331, lng: 72.978090};
  
           map = new google.maps.Map(mapEle, {
            center: pyrmont,
            zoom: 15
          });
  
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: pyrmont,
            radius: 1500,
            type: ['mosque']
          }, callback);
        }
  
        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }
  
        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
  
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
        }
        initMap();



        //   marker.addListener('click', () => {
        //     infoWindow.open(map, marker);
        //   });
        // });

        // google.maps.event.addListenerOnce(map, 'idle', () => {
        //   mapEle.classList.add('show-map');
        // });

      // });

  }
}
