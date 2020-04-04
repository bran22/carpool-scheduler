import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICarpool } from '../../_shared/interfaces/carpool';

@Injectable({
  providedIn: 'root'
})
export class ApiDatabaseService {

  constructor(
    private db: AngularFirestore,
  ) { }

  // Firestore database requests go here
  // in general, use valueChanges() if you just want to get a read-only stream of data
  // and use snapshotChanges() if you need the documentIDs

  getCarpools() {
    // trying to get documentIds as well, see example here:
    // https://github.com/angular/angularfire/blob/7eb3e51022c7381dfc94ffb9e12555065f060639/docs/firestore/collections.md#example
    return this.db.collection<ICarpool>('carpools').valueChanges({idField: 'carpoolId'});
  }
}
