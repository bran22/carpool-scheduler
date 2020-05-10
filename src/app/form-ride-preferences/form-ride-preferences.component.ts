import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICarpoolPreference, ICarpoolRide } from '../_shared/interfaces/_index';
import { ApiDatabaseService } from '../_shared/services/_index';

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
    this.oneWayEnum = [
      {label: 'Both Ways', value: 'both-ways'},
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

    this.initializeForm();
  }

  initializeForm() {
    this.preferencesForm = this.formBuilder.group({
      isParticipating: [true, Validators.required],
      oneWay: ['both-ways', Validators.required],
      isDriver: [false, Validators.required],
      isCustomMeetTime: [false, Validators.required],
      customMeetTime: [],
      isCustomDepartTime: [false, Validators.required],
      customDepartTime: [],
    });
  }

  onTestFormClick() {
    console.log(this.preferencesForm.value);
  }

  onRidePreferenceUpdate(prefs: ICarpoolPreference[]) {
    console.log(prefs);
  }

  patchPreferenceForm() {
  }

}
