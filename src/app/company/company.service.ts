import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Company } from './company';

@Injectable()
export class CompanyService {
  companies$: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.companies$ = this.db.list(`companies`);
  }

  getCompany(companyId: string) {
    return this.db.object(`companies/${companyId}`);
  }

  getCompanies() {
    return this.companies$;
  }

  saveCompany(company) {
    Observable.from(this.companies$.push({ name: company.name }))
      .catch(error => Observable.throw(error));
  }

  editCompany(company: Company) {
    this.companies$.update(company.$key, { phone: 123 })
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeCompany(company: Company) {
    this.companies$.remove(company.$key)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

}
