import { TestBed, inject } from '@angular/core/testing';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';

describe('AuthService', () => {
  let authService: AuthService;
  let authSubject: Subject<firebase.User>;

  beforeEach(() => {
    authSubject = new Subject<firebase.User>();

    TestBed.configureTestingModule({
      providers: [AuthService],
    });
  });

  it(`should create an authService`, () => {
    expect(authService).toBeTruthy();
  });

  it(`should have a subscribe to auth state changes`, () => {
    const firebaseUser = { uid: '12345' } as firebase.User;

    authService.user$.subscribe(user => {
      expect(user.uid).toEqual(firebaseUser.uid);
    });

    authSubject.next(firebaseUser);
  });

});
