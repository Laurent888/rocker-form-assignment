import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '../common/Button';
import TextInput from '../common/TextInput';
import Picker, { CountryProps } from '../common/Picker';
import ListMessages from '../common/ListMessages';

import { theme } from '../../lib/theme';
import { styles } from './styles';
import {
    validateSSN,
    validatePhoneNumber,
    validationSchema,
} from './validationUtils';
import { setDataToStorage } from '../../lib/utils/storage';

interface CustomFormProps {
    containerStyle?: ViewStyle;
    pickerData: CountryProps[];
    initialValuesStorage?: ValuesProps | null;
}

export interface ValuesProps {
    ssn: string;
    phoneNumber: string;
    email: string;
    country: string;
}

const initialValues: ValuesProps = {
    ssn: '',
    phoneNumber: '',
    email: '',
    country: '',
};

/******  Form Component ********/

const CustomForm = ({
    containerStyle,
    pickerData,
    initialValuesStorage,
}: CustomFormProps) => {
    // HANDLE SUBMIT
    const handleSubmit = (
        values: ValuesProps,
        actions: FormikHelpers<ValuesProps>,
    ) => {
        console.log('Values', values);

        // Set form values to storage
        setDataToStorage(values);

        // Validate the SSN
        const isValidSSN = validateSSN(values.ssn);
        if (!isValidSSN) {
            actions.setFieldError(
                'ssn',
                "This SSN doesn't seem valid, please try again",
            );
        }

        // Validate Phone Number
        const isValidPhoneNumber = validatePhoneNumber(values.phoneNumber);
        if (!isValidPhoneNumber) {
            actions.setFieldError('phoneNumber', 'Invalid phone number');
        }

        // Success
        console.log('FORM SUCCESSFULLY SUBMITTED !!');
        return actions.setSubmitting(false);
    };

    return (
        <Formik
            // Use data from storage as initial values if app was interrupted before successuful submission
            initialValues={
                initialValuesStorage ? initialValuesStorage : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                                data={pickerData}
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
