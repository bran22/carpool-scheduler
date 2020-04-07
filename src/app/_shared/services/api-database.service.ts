import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser, ICarpool } from '../interfaces/_index';
import { map, switchMap } from 'rxjs/operators';

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

  addUserToCarpool(carpoolId: string, userId: string) {
    // console.log(`updating ${carpoolId} with ${userId}`);
    return this.showUser(userId).pipe(
      // feth user data from db first
      switchMap(appUser => {
        // then, add user's name (from database) to carpool participants list
        const newParticipant = {
          participants: {[userId]: appUser.name}
        };
        return this.db.collection('carpools').doc(`${carpoolId}`).set(newParticipant, {merge: true});
      })
    );
  }

  showUser(userId: string) {
    return this.db.doc<AppUser>(`/users/${userId}`).valueChanges();
  }

  createOrUpdateUser(action: 'create' | 'update', userId: string, name: string, email: string, photoUrl: string) {
    if (action === 'create') {
      this.db.collection('users').doc(userId).set({name, email, photoUrl, points: 0});
    } else {
      this.db.collection('users').doc(userId).update({name, email, photoUrl});
    }
  }
}
