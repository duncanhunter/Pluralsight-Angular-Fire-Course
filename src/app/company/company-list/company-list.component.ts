import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from '../company.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Company } from '../company';

import { AppState } from '../../state/appState';
import { Store } from '@ngrx/store';
import * as CompanyActions from './../../state/company.actions';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnDestroy {
  companies$: Observable<Company[]>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new CompanyActions.ConnectCompaniesAction());
    this.companies$ = this.store.select(state => state.companies);
  }

  ngOnDestroy() {
    this.store.dispatch(new CompanyActions.DisconnectCompaniesAction());
  }

}
