import * as CompanyActions from './company.actions';
import { Company } from '../company/company';

export function companyReducer(state = [], action) {
    switch (action.type) {
        case CompanyActions.CONNECT_COMPANIES_SUCCESS: {
            return action.payload;
        }

        case CompanyActions.ADDED_COMPANY_SYNCED:
            const exists = state.find(company => company.$key === action.payload.$key);
            return exists ? state : [...state, action.payload];

        case CompanyActions.UPDATED_COMPANY_SYNCED:
            return state.map(company => {
                return company.$key === action.payload.$key ? Object.assign({}, action.payload) : company;
            });

        case CompanyActions.REMOVED_COMPANY_SYNCED:
            return state.filter(company => company.$key !== action.payload.$key);

        default: {
            return state;
        }
    }
}
