import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GetLocation {
 cordinates:any;

  constructor(
    private geolocation: Geolocation
  ) {


  }
  getCurrentLocation(){
   return this.geolocation.getCurrentPosition().then((resp) => {
    this.cordinates= resp.coords;
    return resp.coords
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  
    }
}