import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';

import * as CompanyActions from './../state/company.actions';
import { Company } from './company';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import { Action } from '@ngrx/store';
import { ConnectCompaniesSuccessAction, UpdatedCompanySyncedAction, RemovedCompanySyncedAction } from '../state/company.actions';

@Injectable()
export class CompanyService {
  companies$: FirebaseListObservable<Company[]>;
  company$: FirebaseObjectObservable<Company>;
  companiesEventsSubject: Subject<Action>;
  companiesRef: firebase.database.Reference;

  constructor(private db: AngularFireDatabase) {
    this.company$ = this.db.object(`company`);
    this.companies$ = this.db.list(`companies`);

    this.companiesRef = this.db.list(`companies`).$ref.ref;
    this.companiesEventsSubject = new Subject<Action>();
  }

  getCompaniesEvents(): Observable<Action> {
    this.initConnectCompanies();
    return this.companiesEventsSubject.asObservable();
  }

  initConnectCompanies(): void {
    let initialDataLoaded = false;

    this.companies$
      .first()
      .subscribe(companies => {
      initialDataLoaded = true;
      this.companiesEventsSubject.next(new CompanyActions.ConnectCompaniesSuccessAction(companies));
    });
 
    this.companiesRef.on('child_added', (company) => {
      if (initialDataLoaded) {
        this.companiesEventsSubject.next(new CompanyActions.AddedCompanySyncedAction(this.companyTransform(company)));
      } else { }
    });

    this.companiesRef.on('child_changed', (company) => {
      this.companiesEventsSubject.next(new CompanyActions.UpdatedCompanySyncedAction(this.companyTransform(company)));
    });

    this.companiesRef.on('child_removed', (company) => {
      this.companiesEventsSubject.next(new CompanyActions.RemovedCompanySyncedAction(this.companyTransform(company)));
    });
  }

  diconnectCompanies(): void {
    this.companiesRef.off();
  }

  private companyTransform(c): Company {
    const company: Company = c.val();
    company.$key = c.key;
    return company;
  }

  getCompany(companyKey: string) {
    return this.db.object(`companies/${companyKey}`)
      .catch(this.errorHandler);
  }

  getCompanies() {
    return this.companies$
      .catch(this.errorHandler);
  }

  saveCompany(company: Company) {
    return this.companies$.push(company)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  editCompany(company: Company) {
    return this.companies$.update(company.$key, company)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeCompany(company) {
    return this.companies$.remove(company.$key)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error.message);
  }

}
