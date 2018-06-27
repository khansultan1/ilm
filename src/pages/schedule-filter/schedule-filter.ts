import { Component } from '@angular/core';
import { NavParams, ViewController,NavController } from 'ionic-angular';
import { TimeTableData } from '../../providers/timetable-data';
import { SettingsPage } from '../settings/settings';
import { AboutPage } from '../about/about';
import { TimepreferencesPage } from '../timepreferences/timepreferences';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FeedbackPage } from '../feedback/feedback';
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    public confData: TimeTableData,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public navCtrl:NavController,
    private socialSharing: SocialSharing
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedTrackNames = this.navParams.data;

    // this.confData.getTracks().subscribe((trackNames: string[]) => {

    //   trackNames.forEach(trackName => {
    //     this.tracks.push({
    //       name: trackName,
    //       isChecked: (excludedTrackNames.indexOf(trackName) === -1)
    //     });
    //   });

    // });
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
  settingsPage(){
    this.navCtrl.push(SettingsPage);
  }
  timePreference(){
    this.navCtrl.push(TimepreferencesPage);
  }
  aboutPage(){
    this.navCtrl.push(AboutPage)
  }
  shareApp(){
    this.socialSharing.share("Ilm-e-Islam", "App", "", "");
  }
  feedbackPage(){
    this.navCtrl.push(FeedbackPage);
    
  }
}
