import React, { useEffect, useState } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCountriesAction } from '../../lib/redux/actions';
import { getDataFromStorage } from '../../lib/utils/storage';

import { styles } from './styles';
import Form from './Form';
import { CountryProps } from '../common/Picker';

const logo = require('../../../assets/logo.png');

interface RootState {
    listCountries: CountryProps[];
}

export interface ValuesProps {
    ssn: string;
    phoneNumber: string;
    email: string;
    country: string;
}

interface SnackbarProps {
    visible: boolean;
    message: string;
}

const initialSnackbar: SnackbarProps = {
    visible: false,
    message: '',
};

const initialValues: ValuesProps = {
    ssn: '',
    phoneNumber: '',
    email: '',
    country: '',
};

const RockerForm = () => {
    const [formData, setFormData] = useState<ValuesProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState(initialSnackbar);

    const dispatch = useDispatch();

    useEffect(() => {
        // When app is loaded, fetch the countries

        dispatch(fetchCountriesAction);

        // Check is data in storage

        (async function () {
            const formStorage = await getDataFromStorage('rockerform');
            if (formStorage) {
                setFormData(formStorage);
            } else {
                setFormData(initialValues);
            }
            setLoading(false);
        })();
    }, []);

    // Get the list of countries from the store
    const { listCountries } = useSelector((state: RootState) => state);

    const handleSuccess = () => {
        setFormData(initialValues);
        setSnackbar({ visible: true, message: 'Form submitted !' });
    };

    return (
        <ScrollView style={styles.mainContainer}>
            {/* LOGO */}
            <Image source={logo} resizeMode="contain" style={styles.logo} />

            {/* Render only if data fetched from storage */}
            {!loading && formData && (
                <Form
                    pickerData={listCountries}
                    initialValues={formData}
                    onSuccess={handleSuccess}
                />
            )}

            {/* Snackbar to inform on successful form submission */}
            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar(initialSnackbar)}
                duration={4000}
                style={styles.snackbarContent}
                wrapperStyle={styles.snackbarWrapper}
            >
                <Text style={{ fontWeight: '700' }}>{snackbar.message}</Text>
            </Snackbar>
        </ScrollView>
    );
};

export default RockerForm;
