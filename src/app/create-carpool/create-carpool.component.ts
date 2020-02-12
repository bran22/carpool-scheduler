
import { Component, OnInit } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-carpool',
  templateUrl: './create-carpool.component.html',
  styleUrls: ['./create-carpool.component.css']
})

export class CreateCarpoolComponent implements OnInit {

  text: string;
  model : CarpoolComponent;
  weekdays: string[] = [];
  checked: boolean = false;

  constructor(
    private db: AngularFirestore
  ) {
    this.model = {
      firstname: '',
      lastname: '',
      carpoolname: ''
    };
  }

  ngOnInit() {
  } 

  saveToFirebase(input: CarpoolComponent) {

    // Add a new document in collection "saved carpools"
    this.db.collection('savedCarpools').add(
      input
    )
    
    .then( () => {
      console.log('Document successfully written!');
    })
    .catch( (error) => {
      console.error('Error writing document: ', error);
    });

  }

}

export interface CarpoolComponent {

    firstname: string;
    lastname: string;
    carpoolname: string;

}

