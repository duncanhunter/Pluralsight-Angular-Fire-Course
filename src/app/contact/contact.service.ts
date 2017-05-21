import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';

import { Contact } from './contact';

@Injectable()
export class ContactService {
  contacts$: FirebaseListObservable<Contact[]>;
  contact$: FirebaseObjectObservable<Contact>;

  constructor(private db: AngularFireDatabase) {
    this.contact$ = this.db.object(`contact`);
    this.contacts$ = this.db.list(`contacts`);
  }

  getContact(contactKey: string) {
    return this.db.object(`contacts/${contactKey}`)
    .catch(this.errorHandler);
  }

  getContacts() {
    return this.contacts$
      .catch(this.errorHandler);
  }

  saveContact(contact: Contact) {
    return this.contacts$.push(contact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  editContact(contact: Contact) {
    return this.contacts$.update(contact.$key, contact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeContact(contact) {
    return this.contacts$.remove(contact.$key)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error.message);
  }

}
