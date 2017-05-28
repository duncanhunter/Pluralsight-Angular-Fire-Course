import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';

import { Contact } from './contact';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {
  subject$ = new BehaviorSubject<string>(undefined);
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
    return this.db.list(`contacts`, {
      query: {
        orderByChild: 'companyKey',
        equalTo: this.subject$
      }
    })
      .catch(this.errorHandler);
  }

  saveContact(contact: Contact) {
    return this.contacts$.push(contact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  editContact(contact: Contact) {
    const updateContact = {};

    updateContact[`contacts/${contact.$key}`] = contact;
    Object.keys(contact.contactCompanies).forEach(companyKey => {
      updateContact[`companyContacts/${companyKey}/${contact.$key}`] = true;
    });

    return this.db.object('/').update(updateContact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeContact(contact) {
    const removeContact = {};

    removeContact[`contacts/${contact.$key}`] = null;
    Object.keys(contact.contactCompanies).forEach(companyKey => {
      removeContact[`companyContacts/${companyKey}/${contact.$key}`] = null;
    });

    return this.db.object('/').update(removeContact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error.message);
  }

}
