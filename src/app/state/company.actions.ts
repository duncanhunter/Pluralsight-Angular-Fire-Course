import { Action } from '@ngrx/store';
import { Company } from '../company/company';

export const DISCONNECT_COMPANIES = 'DISCONNECT_COMPANIES';
export const DISCONNECT_COMPANIES_SUCCESS = 'DISCONNECT_COMPANIES_SUCCESS';
export const CONNECT_COMPANIES = 'CONNECT_COMPANIES';
export const CONNECT_COMPANIES_SUCCESS = 'CONNECT_COMPANIES_SUCCESS';
export const CONNECT_COMPANIES_FAILURE = 'CONNECT_COMPANIES_FAILURE';
export const REMOVE_COMPANY = 'REMOVE_COMPANY';
export const REMOVE_COMPANY_SUCCESS = 'REMOVE_COMPANY_SUCCESS';
export const REMOVE_COMPANY_FAILURE = 'REMOVE_COMPANY_FAILURE';
export const ADDED_COMPANY_SYNCED = 'ADDED_COMPANY_SYNCED';
export const UPDATED_COMPANY_SYNCED = 'UPDATED_COMPANY_SYNCED';
export const REMOVED_COMPANY_SYNCED = 'REMOVED_COMPANY_SYNCED';

export class DisconnectCompaniesAction implements Action {
    readonly type = DISCONNECT_COMPANIES;
}

export class DisconnectCompaniesSuccessAction implements Action {
    readonly type = DISCONNECT_COMPANIES_SUCCESS;
}

export class ConnectCompaniesAction implements Action {
    readonly type = CONNECT_COMPANIES;
}

export class ConnectCompaniesSuccessAction implements Action {
    readonly type = CONNECT_COMPANIES_SUCCESS;
    constructor(public payload: Company[]) { }
}

export class ConnectCompaniesFailureAction implements Action {
    readonly type = CONNECT_COMPANIES_FAILURE;
    constructor(public payload: Error) { }
}

export class RemoveCompanyAction implements Action {
    readonly type = REMOVE_COMPANY;
    constructor(public payload: Company) { }
}

export class RemoveCompanySuccessAction implements Action {
    readonly type = REMOVE_COMPANY_SUCCESS;
}

export class RemoveCompanyFailureAction implements Action {
    readonly type = REMOVE_COMPANY_FAILURE;
    constructor(public payload: Error) { }
}

export class AddedCompanySyncedAction implements Action {
    readonly type = ADDED_COMPANY_SYNCED;
    constructor(public payload: Company) { }
}

export class UpdatedCompanySyncedAction implements Action {
    readonly type = UPDATED_COMPANY_SYNCED;
    constructor(public payload: Company) { }
}

export class RemovedCompanySyncedAction implements Action {
    readonly type = REMOVED_COMPANY_SYNCED;
    constructor(public payload: Company) { }
}

export type All
    = DisconnectCompaniesAction
    | DisconnectCompaniesSuccessAction
    | ConnectCompaniesAction
    | ConnectCompaniesSuccessAction
    | ConnectCompaniesFailureAction
    | RemoveCompanyAction
    | RemoveCompanySuccessAction
    | RemoveCompanyFailureAction
    | AddedCompanySyncedAction
    | UpdatedCompanySyncedAction
    | RemovedCompanySyncedAction;


