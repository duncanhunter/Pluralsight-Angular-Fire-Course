import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class CompanyService {
    company$: FirebaseObjectObservable<any>;

 constructor(private db: AngularFireDatabase) {
     this.company$ = this.db.object(`company`);
   }

  saveCompany(company) {
    this.company$.set(company);
  }

}
