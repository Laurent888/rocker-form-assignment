import { types, FetchCountriesTypes, ReducerState } from './types';

const INITIAL_STATE: ReducerState = {
    listCountries: [],
};

const reducer = (state = INITIAL_STATE, action: FetchCountriesTypes) => {
    switch (action.type) {
        case types.FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                // I don't know why TypeScript is complaining here
                listCountries: [...action.countriesArray],
            };
        case types.FETCH_COUNTRIES_FAIL:
            return {
                ...state,
                listCountries: INITIAL_STATE.listCountries,
            };
        default:
            return state;
    }
};

export default reducer;
