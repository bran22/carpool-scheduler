import { Injectable } from '@angular/core';
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
  // and use snapshotChanges() if you need metadata

  indexCarpools() {
    return this.db.collection<ICarpool>('carpools').valueChanges({idField: 'carpoolId'});
  }

  showUser(userId: string) {
    return this.db.doc(`/users/${userId}`).get();
  }

  createOrUpdateUser(action: 'create' | 'update', userId: string, name: string, email: string, photoUrl: string) {
    if (action === 'create') {
      this.db.collection('users').doc(userId).set({name, email, photoUrl, points: 0});
    } else {
      this.db.collection('users').doc(userId).update({name, email, photoUrl});
    }
  }
}
