import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICarpoolPreference, ICarpoolRide } from '../_shared/interfaces/_index';
import { ApiDatabaseService, AuthService } from '../_shared/services/_index';

@Component({
  selector: 'app-form-ride-preferences',
  templateUrl: './form-ride-preferences.component.html',
  styleUrls: ['./form-ride-preferences.component.css']
})
export class FormRidePreferencesComponent implements OnInit {

  rideId: string;
  ride$: Observable<ICarpoolRide>;

  // form
  preferencesForm: any;
  defaultCustomEnum: any;
  yesNoEnum: any;
  oneWayEnum: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiDatabaseService: ApiDatabaseService,
    private authService: AuthService
  ) {
    // initialize select-options
    this.defaultCustomEnum = [
      {label: 'Default', value: false},
      {label: 'Custom', value: true}
    ];
    this.yesNoEnum = [
      {label: 'Yes', value: true},
      {label: 'No', value: false}
    ];
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( res => {
      this.rideId = res.id;
      this.ride$ = this.apiDatabaseService.showRide(this.rideId);
      this.apiDatabaseService.showRidePreferences(this.rideId).subscribe( prefs => this.onRidePreferenceUpdate(prefs));
    });
  }

  initializeForm(userPrefs?: ICarpoolPreference) {
    const user = this.authService.getLoggedInUserIdAndName();

    if (userPrefs) {
      this.preferencesForm = this.formBuilder.group({
        userId: [user.userId, Validators.required],
        isParticipating: [userPrefs.isParticipating, Validators.required],
        oneWay: [userPrefs.oneWay, Validators.required],
        isDriver: [userPrefs.isDriver, Validators.required],
        isCustomMeetTime: [userPrefs.isCustomMeetTime, Validators.required],
        customMeetTime: [userPrefs.customMeetTime],
        isCustomDepartTime: [userPrefs.isCustomDepartTime, Validators.required],
        customDepartTime: [userPrefs.customDepartTime],
      });
    } else {
      this.preferencesForm = this.formBuilder.group({
        userId: [user.userId, Validators.required],
        isParticipating: [true, Validators.required],
        oneWay: [false, Validators.required],
        isDriver: [false, Validators.required],
        isCustomMeetTime: [false, Validators.required],
        customMeetTime: [],
        isCustomDepartTime: [false, Validators.required],
        customDepartTime: [],
      });
    }
  }

  onTestFormClick() {
    console.log(this.preferencesForm.value);
  }

  onRidePreferenceUpdate(prefs: ICarpoolPreference[]) {
    // see if user had any preferences stored in the database for this ride
    const user = this.authService.getLoggedInUserIdAndName();
    const foundUserPrefs = prefs.find( pref => pref.userId === user.userId);
    // if they did, initialize the form using those preferences
    if (foundUserPrefs) {
      this.initializeForm(foundUserPrefs);
    } else {
      // if not, initialize with default preferences
      this.initializeForm();
    }
  }

  onSaveClick() {
    this.apiDatabaseService.setRidePreferences(this.rideId, this.preferencesForm.value);
    console.log('save done');
  }

}
