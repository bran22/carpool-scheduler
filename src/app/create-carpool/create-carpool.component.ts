
import { Component, Input, OnInit } from '@angular/core';
import { ICarpool, GeoJson, ICarpoolParticipant } from '../_shared/interfaces/_index';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../_shared/services/auth.service';
import {SelectItem, MessageService} from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-carpool',
  templateUrl: './create-carpool.component.html',
  styleUrls: ['./create-carpool.component.css']
})

export class CreateCarpoolComponent implements OnInit {

  text: string;
  model : ICarpool;
  //weekdays: string[] = [];
  checked: boolean = false;
  destPoint: GeoJson;
  user: any;
  userID: string;

  participant: ICarpoolParticipant;

  constructor(
    private db: AngularFirestore,
    public authService: AuthService,
    private messageService: MessageService
  ) {  
      
   }

  ngOnInit() {
  } 

  saveToFirebase(carpool: ICarpool) {

    this.user = this.authService.getLoggedInUserData();
    console.log('Display name: ', this.user.displayName, 'id: ', this.user.uid); 
    this.participant.name = this.user.displayName;
    this.participant.userId = this.user.uid;

    this.model.participants.push(this.participant);// = this.participant;
    // Add a new document in collection "saved carpools"
    this.db.collection('savedCarpools').add(
      carpool
    )
    
    .then( () => {
      console.log('Document successfully written!');
      this.messageService.add({severity: 'success', summary: 'Carpool Saved'});
    })
    .catch( (error) => {
      console.error('Error writing document: ', error);
      this.messageService.add({severity: 'error', summary: 'Failed to Save Carpool'});
    });

  }

  onSelectLocation(point: GeoJson, type?: boolean) {
    console.log('point: ', point);
    if (type) {
      this.model.destinationPoint = point;
    }
    else {
      this.model.meetupPoint = point;
    }
    
  }

}


