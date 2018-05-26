import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GetLocation } from '../../providers/getcurrentlocation';
declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public platform: Platform,  public getLocation:GetLocation,) {
  }

  ionViewDidLoad() {
        let mapEle = this.mapElement.nativeElement;
        var infowindow=null;
        var map=null;
        var locationObj=this.getLocation;
        function initMap() {
          let location=locationObj.getCurrentLocation();
          location.then(resp=>{
          var pyrmont = {lat: resp['latitude'], lng: resp['longitude']};
            
           map = new google.maps.Map(mapEle, {
            center: pyrmont,
            zoom: 15
          });
  
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: pyrmont,
            radius: 3000,
            type: ['mosque']
          }, callback);
        })
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
