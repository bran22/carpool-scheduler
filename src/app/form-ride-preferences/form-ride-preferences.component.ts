import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {MessageService} from 'primeng/api';
import { ICarpoolPreference, ICarpoolRide } from '../_shared/interfaces/_index';
import { ApiDatabaseService, AuthService } from '../_shared/services/_index';

@Component({
  selector: 'app-form-ride-preferences',
  templateUrl: './form-ride-preferences.component.html',
  styleUrls: ['./form-ride-preferences.component.css']
})
export class FormRidePreferencesComponent implements OnInit {

  // for rendering in DOM
  ride$: Observable<ICarpoolRide>;
  allOtherRidePreferences: ICarpoolPreference[];

  // form
  preferencesForm: FormGroup;
  rideId: string;
  defaultCustomEnum: any;
  yesNoEnum: any;
  oneWayEnum: any;
  toFromDestinationEnum: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiDatabaseService: ApiDatabaseService,
    private authService: AuthService,
    private messageService: MessageService
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
    this.toFromDestinationEnum = [
      {label: 'To Destination', value: 'to-destination'},
      {label: 'From Destination', value: 'from-destination'}
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
        oneWayDirection: [userPrefs.oneWayDirection],
        isDriver: [userPrefs.isDriver, Validators.required],
        isCustomMeetTime: [userPrefs.isCustomMeetTime, Validators.required],
        customMeetTime: [userPrefs.customMeetTime ? userPrefs.customMeetTime.toDate() : null],
        isCustomDepartTime: [userPrefs.isCustomDepartTime, Validators.required],
        customDepartTime: [userPrefs.customDepartTime ? userPrefs.customDepartTime.toDate() : null],
      });
    } else {
      this.preferencesForm = this.formBuilder.group({
        userId: [user.userId, Validators.required],
        isParticipating: [true, Validators.required],
        oneWay: [false, Validators.required],
        oneWayDirection: [],
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
    // shallow-copy preferences array into a global variable for rendering in DOM
    this.allOtherRidePreferences = [...prefs];

    // see if user had any preferences stored in the database for this ride
    const user = this.authService.getLoggedInUserIdAndName();
    const foundUserPrefs = prefs.find( pref => pref.userId === user.userId);
    // if they did, initialize the form using those preferences
    if (foundUserPrefs) {
      this.initializeForm(foundUserPrefs);
      // remove the user's prefs from the "all other user's prefs" array
      const foundUserPrefsIndex = prefs.findIndex( pref => pref.userId === user.userId);
      this.allOtherRidePreferences.splice(foundUserPrefsIndex);
    } else {
      // if not, initialize with default preferences
      this.initializeForm();
    }
  }

  onSaveClick() {
    // form validation

    this.apiDatabaseService.setRidePreferences(this.rideId, this.preferencesForm.value);
    this.messageService.add({severity: 'success', summary: 'Saved!', detail: `Your ride preferences have been saved!`});
  }

  onOneWayChange(isOneWay: boolean) {
    // if user selects a both-way ride, then clea out the oneWayDirection value
    if (!isOneWay) {
      this.preferencesForm.patchValue(
        {oneWayDirection: null}
      );
    }
  }

  onTimeChange(formControlName: string, isCustomTime: boolean) {
    // if user selects Default for either meet or depart time, clear out the respective custom time value
    if (!isCustomTime) {
      this.preferencesForm.patchValue(
        {[formControlName]: null}
      );
    }
  }

}
