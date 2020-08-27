import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../components/Form';
import { CountryProps } from '../components/common/Picker';
import { fetchCountriesAction } from '../lib/redux/actions';

interface RootState {
    listCountries: CountryProps[];
}

const HomeScreen = () => {
    const dispatch = useDispatch();

    // When app is loaded, fetch the countries
    useEffect(() => {
        dispatch(fetchCountriesAction);
    }, []);

    const { listCountries } = useSelector((state: RootState) => state);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ marginTop: 50 }}
        >
            <StatusBar barStyle="default" />

            <Form pickerData={listCountries} />
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
