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
  departTimeSelector: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiDatabaseService: ApiDatabaseService,
  ) {
    // initialize select-options
    this.departTimeSelector = [
      {label: 'Default', value: true},
      {label: 'Custom', value: false}
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
      isDefaultDepartTime: ['', Validators.required],
      departTime: []
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
