import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { ICarpool } from '../../_shared/interfaces/carpool';
import { map, mergeMap, switchMap, merge, toArray, tap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { AppUser } from '../interfaces/app-user';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';

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

  // possible answer here: https://stackoverflow.com/a/41771379
  // or here https://medium.com/@joaqcid/how-to-inner-join-data-from-multiple-collections-on-angular-firebase-bfd04f6b36b7
  indexCarpools() {
    return this.db.collection<ICarpool>('carpools').valueChanges({idField: 'carpoolId'})
    // .pipe(
      // map( carpools => {
      //   // console.log(carpools);
      //   // for each carpool in the stream, get an Observable[] of the participants
      //   carpools.forEach( carpool => {
      //     // console.log(carpool.participants[0].id);
      //     const bla = this.indexCarpoolParticipants(carpool.participants);
      //     console.log(bla);
      //     forkJoin(bla).pipe(
      //       map( res => {
      //         console.log('got forkjoin result');
      //         console.log(res);
      //         return {carpool, ...res};
      //       })
      //     );
      //   });
      // })

    // );
  }

  private indexCarpoolParticipants(collectionReferences: CollectionReference[]) {
    // for a given carpool, look into the participants[] and create an observable
    // to fetch each user's document
    const observables: Observable<AppUser>[] = [];
    collectionReferences.forEach( ref => {
      observables.push(this.db.collection('users').doc<AppUser>(ref.id).valueChanges());
    });
    return observables;
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
