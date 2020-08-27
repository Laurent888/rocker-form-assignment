import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
    ActionSheetIOS,
} from 'react-native';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from './common/Button';
import TextInput from './common/TextInput';
import Picker from './common/Picker';
import ListMessages from './common/ListMessages';
import { theme } from '../lib/theme';
import { validateSSN } from '../lib/utils/checkSSN';
import { validatePhoneNumber } from '../lib/utils/checkPhone';

interface CustomFormProps {
    containerStyle?: ViewStyle;
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
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

// YUP validation schema
const validationSchema = Yup.object({
    ssn: Yup.number()
        .test(
            'length',
            'Your SSN must at least 12 digits',
            (val: number | null | undefined) => val?.toString().length === 12,
        )
        .required(),
    phoneNumber: Yup.number()
        .typeError('Phone must be a number')
        .required('Phone number is empty'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is empty'),
    country: Yup.string().required('Country field is empty'),
});

// Form component
const CustomForm = ({ containerStyle }: CustomFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log('Values', values);

                // Validate the SSN
                const isValidSSN = validateSSN(values.ssn);
                if (!isValidSSN) {
                    actions.setFieldError(
                        'ssn',
                        "This SSN doesn't seem valid, please try again",
                    );
                }

                // Validate Phone Number
                const isValidPhoneNumber = validatePhoneNumber(
                    values.phoneNumber,
                );
                if (!isValidPhoneNumber) {
                    actions.setFieldError(
                        'phoneNumber',
                        'Invalid phone number',
                    );
                }

                return actions.setSubmitting(false);
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
                console.log('Errors', errors);

                // Format the errors list into an array of strings
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
                        <View style={[styles.container, containerStyle]}>
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
                                selectedValue={values.country}
                            />

                            {listErrors.length !== 0 && (
                                <ListMessages
                                    list={listErrors}
                                    color={theme.colors.errorSecondary}
                                />
                            )}

                            {/* Submit Button */}
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
