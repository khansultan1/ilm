import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TimeTableData } from '../../providers/timetable-data';
/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}

@Component({
  template: `
    <form [formGroup]="ngForm" (ngSubmit)="logForm()" novalidate>
      <ion-item>
        <ion-label>Your Name</ion-label>
        <ion-input type="text" required  formControlName="title"></ion-input>
      </ion-item>
      <ion-item>
      <ion-label>Your Email</ion-label>
      <ion-input type="email" required  formControlName="email"></ion-input>
     </ion-item>
      <ion-item>
        <ion-label>Feedback</ion-label>
        <ion-textarea required formControlName="description"></ion-textarea>
      </ion-item>
      <button ion-button type="submit" block>Submit</button>
    </form>
  `,
  selector: 'feedback-form',
})

export class FormsPage {
  private ngForm : FormGroup;

  constructor( private formBuilder: FormBuilder , public timetable:TimeTableData, public toast:ToastController) {
    this.ngForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['',  Validators.required],
      email:['', Validators.required]
    });
  }
  logForm(){
    console.log(this.ngForm.value);
    this.timetable.postFeedback(this.ngForm.value);
    let toast = this.toast.create({
      message: 'Your feedback has been sent.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}