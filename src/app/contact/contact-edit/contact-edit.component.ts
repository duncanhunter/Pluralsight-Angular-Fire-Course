import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  isNewContact: boolean;
  contactKey: string;
  contact$: FirebaseObjectObservable<Contact> | Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit() {
    this.contactKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    !this.isNewContact ? this.getContact() : this.contact$ = Observable.of({}) as FirebaseObjectObservable<Contact>;
  }

  getContact() {
    this.contact$ = this.contactService.getContact(this.contactKey);
  }

  saveContact(contact) {
    const save = this.isNewContact
      ? this.contactService.saveContact(contact)
      : this.contactService.editContact(contact);

      save.then(_ => this.router.navigate([`contact-list`]));
  }

  removeContact(contact) {
    this.contactService.removeContact(contact)
    .then(_ => this.router.navigate([`contact-list`]));
  }
}
