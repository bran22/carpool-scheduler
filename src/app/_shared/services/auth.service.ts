import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';  // for different login providers such as Google Auth API
import { User } from 'firebase';
import { ApiDatabaseService } from './api-database.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser$: Observable<User>;
  loggedInUser: User;

  constructor(
    private afAuth: AngularFireAuth,
    private apiDatabaseService: ApiDatabaseService
  ) { }

  subscribeToAuthChanges() {

    // subscribe to auth changes
    this.loggedInUser$ = this.afAuth.user;
    this.loggedInUser$.subscribe( user => {
      this.loggedInUser = user; // for components that only need the current value of the loggedInUser, use this
      if (user) {
        this.updateUsersCollection(user);
      }
    });
  }

  login() {
    // send user to Google Authenticator
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    // sign the user out
    this.afAuth.auth.signOut();
  }

  getLoggedInUser() {
    // returns the observable, so we can make real-time changes
    return this.loggedInUser$;
  }

  getLoggedInUserData() {
    // returns just the stashed data, so we can reference specific properties for one-off use
    return this.loggedInUser;
  }

  updateUsersCollection(user: User) {
    const userId = user.uid;
    const name = user.displayName;
    const email = user.email;
    const photoUrl = user.photoURL;
    this.apiDatabaseService.showUser(userId).subscribe( foundUser => {
      if (!foundUser) {
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

