import * as firebase from 'firebase/app'; // typings only
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
  contact = {name: ''} as Contact;
  selectedCompany: Company;
  contactCompanies = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    this.contactKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    if (!this.isNewContact) { this.getContact(); };
  }

  uploadFile(event: any) {
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`contacts/${this.contactKey}`);
    storageRef.put(file)
      .then(uploadTask => this.contact.imageUrl = uploadTask.downloadURL);
  }

  addCompany() {
    this.contact.contactCompanies[this.selectedCompany.$key] = { name: this.selectedCompany.name };
    this.setContactCompanies();
  }

  getContact() {
    this.contactService.getContact(this.contactKey)
      .subscribe(contact => {
        this.contact = contact;
        this.setContactCompanies();
      });
  }

  setContactCompanies() {
    if (this.contact.contactCompanies == null) { this.contact.contactCompanies = {}; };
    this.contactCompanies = Object.keys(this.contact.contactCompanies).map(key => this.contact.contactCompanies[key]);
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
