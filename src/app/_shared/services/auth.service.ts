import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';  // for different login providers such as Google Auth API
import { User } from 'firebase';
import { ApiDatabaseService } from './api-database.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn$: BehaviorSubject<boolean>;
  loggedInUser: User;

  constructor(
    private afAuth: AngularFireAuth,
    private apiDatabaseService: ApiDatabaseService
  ) { }

  subscribeToAuthChanges() {
    // initialize boolean BehaviorSubject for sending login state updates when state changes
    // we're using a BehaviorSubject because it also replays the latest state on Subscribe
    this.isUserLoggedIn$ = new BehaviorSubject(false);

    // subscribe to auth changes
    this.afAuth.user.subscribe( user => {
      this.loggedInUser = user; // for components that only need the current value of the loggedInUser, use this
      if (user) {
        this.isUserLoggedIn$.next(true);  // emit whether user is logged in or not to the subject
        this.updateUsersCollection(user);
      } else {
        this.isUserLoggedIn$.next(false);
      }
    });
  }

  login() {
    // show Google Authenticator popup window
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    // sign the user out
    this.afAuth.auth.signOut();
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  updateUsersCollection(user: User) {
    const userId = user.uid;
    const name = user.displayName;
    const email = user.email;
    const photoUrl = user.photoURL;
    this.apiDatabaseService.showUser(userId).subscribe( foundUser => {
      if (!foundUser.exists) {
        // if user does not exist in the users collection, create them
        this.apiDatabaseService.createOrUpdateUser('create', userId, name, email, photoUrl);
        console.log('user was created');
      } else {
        console.log('user was found and updated');
        this.apiDatabaseService.createOrUpdateUser('update', userId, name, email, photoUrl);
      }
    });
  }

}

