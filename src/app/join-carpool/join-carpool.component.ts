import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICarpool } from '../_shared/interfaces/carpool';

@Component({
  selector: 'app-join-carpool',
  templateUrl: './join-carpool.component.html',
  styleUrls: ['./join-carpool.component.css']
})
export class JoinCarpoolComponent implements OnInit {

  carpools: Observable<ICarpool[]>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.carpools = db.collection<ICarpool>('carpools').valueChanges();
  }

  ngOnInit() {
    this.carpools.subscribe( res => console.log(res));
  }

}
