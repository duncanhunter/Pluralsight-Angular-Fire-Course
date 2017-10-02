import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { CompanyService } from '../company/company.service';
import * as CompanyActions from './company.actions';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { DisconnectCompaniesSuccessAction } from './company.actions';

@Injectable()
export class CompanyEffects {

    @Effect() connectCompanies$ = this.actions$
        .ofType(CompanyActions.CONNECT_COMPANIES, CompanyActions.DISCONNECT_COMPANIES)
        .switchMap(action => {
            if (action.type === CompanyActions.CONNECT_COMPANIES) {
                return this.companyService.getCompaniesEvents()
                    .catch(error => Observable.of(new CompanyActions.ConnectCompaniesFailureAction(error)));
            } else {
                this.companyService.diconnectCompanies();
                return Observable.of(new CompanyActions.DisconnectCompaniesSuccessAction());
            }
        });

    // @Effect() connectCompanies$ = this.actions$
    //     .ofType(CompanyActions.CONNECT_COMPANIES, CompanyActions.DISCONNECT_COMPANIES)
    //     .switchMap(action => {
    //         if (action.type === CompanyActions.CONNECT_COMPANIES) {
    //             return this.companyService.getCompanies()
    //                 .map(companies => (new CompanyActions. (companies)))
    //                 .catch(error => Observable.of(new CompanyActions.ConnectCompaniesFailureAction(error)));
    //         } else {
    //             return Observable.of(new CompanyActions.DisconnectCompaniesSuccessAction());
    //         }
    //     });

    constructor(
        private router: Router,
        private companyService: CompanyService,
        private actions$: Actions
    ) { }

}
