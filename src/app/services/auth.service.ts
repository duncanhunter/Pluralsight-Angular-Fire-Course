import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/shareReplay';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => this.router.navigate([`company-list`]))
      .catch(error => console.log('error', error));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([`home`]);
  }

}
