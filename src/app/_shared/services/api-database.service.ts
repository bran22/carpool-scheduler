import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser, ICarpool, ICarpoolRide, ICarpoolPreference, IUserIdAndName } from '../interfaces/_index';
import { map, switchMap, mergeAll } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiDatabaseService {

  constructor(
    private db: AngularFirestore,
  ) { }

  // Firestore database requests go here.
  // In general, use valueChanges() if you just want to get a read-only live-stream of data,
  // and use snapshotChanges() if you need metadata too.
  // Using valueChanges({idField: 'yourNameHere'}) can retrieve docID without needing to use snapshotChanges()

  indexCarpools() {
    return this.db.collection<ICarpool>('carpools').valueChanges({idField: 'carpoolId'});
  }

  showCarpoolsWithParticipant(userId: string) {
    return this.db.collection<ICarpool>('carpools', ref => ref.where(`participants.${userId}`, '>', ''))
      .valueChanges({idField: 'carpoolId'});
  }

  showCarpool(carpoolId: string) {
    return this.db.collection('carpools').doc<ICarpool>(carpoolId).valueChanges();
  }

  addUserToCarpool(carpoolId: string, userId: string) {
    // console.log(`updating ${carpoolId} with ${userId}`);
    return this.showUser(userId).pipe(
      // fetch user data from db first
      switchMap(appUser => {
        // then, add user's name (from database) to carpool participants list
        const newParticipant = {
          participants: {[userId]: appUser.name}
        };
        return this.db.collection('carpools').doc(`${carpoolId}`).set(newParticipant, {merge: true});
      })
    );
  }

  showRide(rideId: string) {
    // get the ride data given a single rideID
    return this.db.doc<ICarpoolRide>(`rides/${rideId}`).valueChanges();
  }

  showRidePreferences(rideId: string) {
    // get all ride-preferences from the subcollection, given a rideID
    return this.db.collection<ICarpoolPreference>(`rides/${rideId}/ridePreferences`).valueChanges({idField: 'userId'});
  }

  showLatestRideForCarpool(carpoolId: string) {
    // get the latest ride given a specific carpoolID
    return this.db.collection<ICarpoolRide>(
      'rides', ref => ref
        .where('carpoolId', '==', carpoolId)
        .where('rideDate', '<', moment().toDate())
        .orderBy('rideDate', 'desc')
        .limit(1)
      )
      .valueChanges({idField: 'rideId'})
      .pipe(
        mergeAll()  // flatten from [{}] to {} structure since we're only getting one obj
      );
  }

  showLatestRideWithPreferences(carpoolId: string) {
    // first, get the latest ride in a carpoolID to extract rideID
    return this.showLatestRideForCarpool(carpoolId).pipe(
      // switch to a new observable (dump the old one), using rideID to query its subcollection of ridePreferences
      switchMap( ride => {
        return this.showRidePreferences(ride.rideId).pipe(
          map( prefs => {
            // since this returns ICarpoolPreference[], add this as a child property to the original ride
            return Object.assign( {}, {
              ...ride,
              ridePreferences: prefs
            });
          })
        );
      })
    );
  }

  showUpcomingRidesForCarpool(carpoolId: string) {
    // show the upcoming rides given a specific carpoolID
    return this.db.collection<ICarpoolRide>(
      'rides', ref => ref
        .where('carpoolId', '==', carpoolId)
        .where('rideDate', '>=', moment().toDate())
        .orderBy('rideDate', 'asc')
      )
      .valueChanges({idField: 'rideId'});
  }

  showUpcomingRidesForUser(user: IUserIdAndName) {
    // show the upcoming rides given a specific carpoolID
    return this.db.collection<ICarpoolRide>(
      'rides', ref => ref
        .where('potentialParticipants', 'array-contains', user)
        .where('rideDate', '>=', moment().toDate())
        .orderBy('rideDate', 'asc')
      )
      .valueChanges({idField: 'rideId'});
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
