import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromEventPattern';

import { Company } from './company';

@Injectable()
export class CompanyService {
  companies$: FirebaseListObservable<Company[]>;
  company$: FirebaseObjectObservable<Company>;

  constructor(private db: AngularFireDatabase) {
    this.company$ = this.db.object(`company`);
    this.companies$ = this.db.list(`companies`);



    const childAdded = Observable.fromEventPattern(
      (handler: any) => { this.companies$.$ref.ref.on('child_added', handler); },
      (handler: any) => { this.companies$.$ref.ref.off('child_added', handler); },
      (snapshot) => console.log('snapshot', snapshot.val()) // <-- selector parameter
    );

    childAdded.subscribe(x => console.log('snapshot subscribed', x));




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
