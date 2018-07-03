import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  constructor(public popoverCtrl: PopoverController) { }

}
