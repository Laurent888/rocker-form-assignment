import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from './common/Button';
import TextInput from './common/TextInput';
import Picker from './common/Picker';
import ListMessages from './common/ListMessages';
import { theme } from '../lib/theme';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 500,
        width: '80%',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        paddingVertical: 5,
    },
});

const initialValues = {
    ssn: '',
    phoneNumber: '',
    email: '',
    country: '',
};

const mockData = [
    {
        label: 'France',
        value: 'france',
    },
    {
        label: 'Germany',
        value: 'germany',
    },
    {
        label: 'Spain',
        value: 'spain',
    },
];

const validationSchema = Yup.object({
    ssn: Yup.number()
        .min(12, 'Your SSN must at least 12 digits')
        .max(12)
        .required(),
    phoneNumber: Yup.number().required(),
    email: Yup.string().email('Invalid email format').required(),
    country: Yup.string().required(),
});

const CustomForm = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values);
            }}
        >
            {({
                handleChange,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                values,
            }) => {
                console.log(errors);

                const listErrors = Object.values(errors) as string[];

                return (
                    <KeyboardAwareScrollView
                        style={{ width: '100%' }}
                        contentContainerStyle={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View style={styles.container}>
                            <Text style={styles.title}>Rocker Form</Text>

                            {/* Text Input for SSN, phone and Email */}
                            <TextInput
                                label="Social security number"
                                value={values.ssn}
                                maxLength={12}
                                keyboardType="number-pad"
                                onChangeText={handleChange('ssn')}
                            />
                            <TextInput
                                label="Phone number"
                                value={values.phoneNumber}
                                onChangeText={handleChange('phoneNumber')}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                label="Email address"
                                value={values.email}
                                onChangeText={handleChange('email')}
                            />

                            {/* Picker select countries */}
                            <Picker
                                data={mockData}
                                onValueChange={(value) =>
                                    setFieldValue('country', value)
                                }
                            />

                            {/* {listErrors.length !== 0 && (
                                <ListMessages
                                    list={listErrors}
                                    color={theme.colors.errorSecondary}
                                />
                            )} */}

                            <Button
                                mode="contained"
                                onPress={handleSubmit}
                                style={{ marginTop: 20 }}
                            >
                                Send
                            </Button>
                        </View>
                    </KeyboardAwareScrollView>
                );
            }}
        </Formik>
    );
};

export default CustomForm;
