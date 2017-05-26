import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../contact';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  companies$: Observable<Company[]>;
  isNewContact: boolean;
  contactKey: string;
  contact$: FirebaseObjectObservable<Contact> | Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
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
