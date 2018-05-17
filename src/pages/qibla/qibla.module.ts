import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QiblaPage } from './qibla';

@NgModule({
  declarations: [
    QiblaPage,
  ],
  imports: [
    IonicPageModule.forChild(QiblaPage),
  ],
})
export class QiblaPageModule {}
