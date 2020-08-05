
import { Component, Input, OnInit } from '@angular/core';
import { ICarpool, GeoJson, ICarpoolParticipant } from '../_shared/interfaces/_index';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../_shared/services/auth.service';
import {SelectItem, MessageService} from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-carpool',
  templateUrl: './create-carpool.component.html',
  styleUrls: ['./create-carpool.component.css']
})

export class CreateCarpoolComponent implements OnInit {
  
  participant: ICarpoolParticipant;
  carpoolForm : FormGroup;
  carpool : ICarpool;
  destPoint: GeoJson;
  user: any;
  saved: boolean = false;

  

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {  
      
   }

  ngOnInit() {
    this.initForm();
  } 

  initForm() {
    this.carpoolForm = this.formBuilder.group({
      carpoolName: ["", Validators.required],
      destinationName: ["", Validators.required],
      destinationPoint: [],
      meetupName: ["", Validators.required],
      meetupPoint: [],
      meetupTime: ["", Validators.required],
      meetupDays: [],
      owner: ["", Validators.required],
      participant: [],
    })
    this.user = this.authService.getLoggedInUserData();
    this.participant = {
      name: this.user.displayName,
      userId: this.user.uid
    }

  }

  saveToFirebase(carpoolForm) {

    console.log('carpoolForm:', carpoolForm);
    // this.user = this.authService.getLoggedInUserData();
    // console.log('Display name: ', this.user.displayName, 'id: ', this.user.uid); 
    // this.participant.name = this.user.displayName;
    // participant.userId = this.user.uid;

    console.log(this.participant);
    this.carpoolForm.get("participant").patchValue(this.participant);
    // Add a new document in collection "saved carpools"
    this.db.collection('carpools').add(
      carpoolForm
    )
    
    .then( () => {
      console.log('Document successfully written!');
      this.messageService.add({severity: 'success', summary: 'Carpool Saved'});
      this.navigate();
    })
    .catch( (error) => {
      console.error('Error writing document: ', error);
      this.messageService.add({severity: 'error', summary: 'Failed to Save Carpool'});
      
    });

  }

  onSelectLocation(point: GeoJson, type?: boolean) {
    console.log('point: ', point);
    if (type) {
     // this.carpoolForm.destinationPoint = point; //this.carpoolForm.get(destinationpoint).patchvalue(point);
      this.carpoolForm.get("destinationPoint").patchValue(point);
    }
    else {
      //this.carpoolForm.meetupPoint = point;
      this.carpoolForm.get("meetupPoint").patchValue(point);
    }
    
  }

  onTestFormClick() {
    console.log(this.carpoolForm);
    console.log(this.carpoolForm.value);
  }

  navigate() {
    this.router.navigateByUrl('/carpools');
 }
 
}


