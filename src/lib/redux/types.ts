import { CountryProps } from '../../components/common/Picker';

export const types = {
    FETCH_COUNTRIES_START: 'FETCH_COUNTRIES_START',
    FETCH_COUNTRIES_SUCCESS: 'FETCH_COUNTRIES_SUCCESS',
    FETCH_COUNTRIES_FAIL: 'FETCH_COUNTRIES_FAIL',
};

interface FetchCountriesStartAction {
    type: typeof types.FETCH_COUNTRIES_START;
}

interface FetchCountriesSuccessAction {
    type: typeof types.FETCH_COUNTRIES_SUCCESS;
    countriesArray: CountryProps[];
}

interface FetchCountriesFailAction {
    type: typeof types.FETCH_COUNTRIES_FAIL;
}

export interface ReducerState {
    listCountries: CountryProps[];
}

export type FetchCountriesTypes =
    | FetchCountriesStartAction
    | FetchCountriesSuccessAction
    | FetchCountriesFailAction;
