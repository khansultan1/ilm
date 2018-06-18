import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZakatcalcPage } from './zakatcalc';

@NgModule({
  declarations: [
    ZakatcalcPage,
  ],
  imports: [
    IonicPageModule.forChild(ZakatcalcPage),
  ],
})
export class ZakatcalcPageModule {}
