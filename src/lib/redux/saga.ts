import { takeEvery, put, call, all } from 'redux-saga/effects';
import axios from 'axios';

import { types } from './types';

const urlAPI = 'https://restcountries.eu/rest/v2/all';

// Fetch countries flow
function* fetchAllCountries() {
    yield takeEvery(types.FETCH_COUNTRIES_START, fetchAllCountriesAsync);
}

function* fetchAllCountriesAsync() {
    const countriesArray = yield call(fetchData);

    if (!countriesArray) {
        return yield put({ type: types.FETCH_COUNTRIES_FAIL });
    }

    yield put({ type: types.FETCH_COUNTRIES_SUCCESS, countriesArray });
}

// Export the rootSage.
export function* rootSaga() {
    yield all([fetchAllCountries()]);
}

// Call functions
const fetchData = async () => {
    try {
        const result = await axios.get(urlAPI);

        const cleanData = result.data.map((country: any) => ({
            label: country.name,
            value: country.name.toLowerCase(),
        }));
        return cleanData;
    } catch (error) {
        return null;
    }
};
