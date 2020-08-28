import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Form, { ValuesProps } from './Form';
import { CountryProps } from '../common/Picker';
import { fetchCountriesAction } from '../../lib/redux/actions';
import { getDataFromStorage } from '../../lib/utils/storage';

interface RootState {
    listCountries: CountryProps[];
}

const RockerForm = () => {
    const [formData, setFormData] = useState<ValuesProps | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // When app is loaded, fetch the countries
        dispatch(fetchCountriesAction);

        // Check is data in storage
        (async function () {
            const formData = await getDataFromStorage('rockerform');
            if (formData) {
                setFormData(formData);
            }
            setLoading(false);
        })();
    }, []);

    // Get the list of countries from the store
    const { listCountries } = useSelector((state: RootState) => state);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ marginTop: 50 }}
        >
            {/* Render only if data fetched from storage */}
            {!loading && (
                <Form
                    pickerData={listCountries}
                    initialValuesStorage={formData}
                    onReset={() => setFormData(null)}
                />
            )}
        </ScrollView>
    );
};

export default RockerForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
});
