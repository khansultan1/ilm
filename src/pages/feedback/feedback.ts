import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
    <form #form="ngForm" (ngSubmit)="logForm(form)" novalidate>
      <ion-item>
        <ion-label>Your Name</ion-label>
        <ion-input type="text" required  ngControl="title"></ion-input>
      </ion-item>
      <ion-item>
      <ion-label>Your Email</ion-label>
      <ion-input type="email" required  ngControl="email"></ion-input>
     </ion-item>
      <ion-item>
        <ion-label>Feedback</ion-label>
        <ion-textarea  ngControl="description"></ion-textarea>
      </ion-item>
      <button ion-button type="submit" block>Submit</button>
    </form>
  `,
  selector: 'feedback-form',
})
export class FormsPage {
  private feedback : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.feedback = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }
  logForm(){
    console.log(this.feedback.value)
  }
}