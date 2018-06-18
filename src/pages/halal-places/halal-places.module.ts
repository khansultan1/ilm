import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HalalPlacesPage } from './halal-places';

@NgModule({
  declarations: [
    HalalPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(HalalPlacesPage),
  ],
})
export class HalalPlacesPageModule {}
