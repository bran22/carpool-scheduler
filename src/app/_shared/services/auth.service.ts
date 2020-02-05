import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';  // for different login providers such as Google Auth API
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn$: BehaviorSubject<boolean>;
  loggedInUser: User;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  subscribeToAuthChanges() {
    // initialize boolean BehaviorSubject for sending login state updates when state changes
    // we're using a BehaviorSubject because it also replays the latest state on Subscribe
    this.isUserLoggedIn$ = new BehaviorSubject(false);

    // subscribe to auth changes
    this.afAuth.user.subscribe( user => {
      console.log('auth state changed to', user);
      this.loggedInUser = user; // for components that only need the current value of the loggedInUser, use this
      if (user) {
        // emit whether user is logged in or not to the subject
        this.isUserLoggedIn$.next(true);
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

}

