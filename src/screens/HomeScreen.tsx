import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Form, { ValuesProps } from '../components/Form';
import { CountryProps } from '../components/common/Picker';
import { fetchCountriesAction } from '../lib/redux/actions';
import { getDataFromStorage } from '../lib/utils/storage';

interface RootState {
    listCountries: CountryProps[];
}

const HomeScreen = () => {
    const [formData, setFormData] = useState<ValuesProps | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // When app is loaded, fetch the countries
        dispatch(fetchCountriesAction);

        // Check is data in storage
        (async function () {
            const formData = await getDataFromStorage();
            if (formData) setFormData(formData);
        })();
    }, []);

    // Get the list of countries from the store
    const { listCountries } = useSelector((state: RootState) => state);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ marginTop: 50 }}
        >
            <StatusBar barStyle="default" />

            <Form pickerData={listCountries} initialValuesStorage={formData} />
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
});
