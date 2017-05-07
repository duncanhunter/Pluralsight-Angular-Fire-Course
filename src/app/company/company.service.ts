import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class CompanyService {
  company$: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.company$ = this.db.object(`company`);
  }

  saveCompany(company) {
    Observable.from(this.company$.set({ name: company.name }))
    .catch(error => Observable.throw(error));
  }

  editCompany(company) {
    this.company$.update({ phone: 123 })
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeCompany(company) {
    this.company$.remove()
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

}
