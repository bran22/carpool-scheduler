import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  items: Observable<any[]>;
  userInput: string;

  constructor(
    private db: AngularFirestore
  ) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
  }

  saveToFirebase(input: string) {

    // Add a new document in collection "cities"
    this.db.collection('items').add({
      name: input
    })
    .then( () => {
      console.log('Document successfully written!');
    })
    .catch( (error) => {
      console.error('Error writing document: ', error);
    });

  }

}
