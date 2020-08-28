import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '../common/Button';
import TextInput from '../common/TextInput';
// import Picker, { CountryProps } from '../common/Picker';
import Picker, { CountryProps } from '../common/Picker';
import ListMessages from '../common/ListMessages';
import { ValuesProps } from './RockerForm';

import { theme } from '../../lib/theme';
import { styles } from './styles';
import {
    validateSSN,
    validatePhoneNumber,
    validationSchema,
} from './validationUtils';
import { setDataToStorage, resetStorage } from '../../lib/utils/storage';

interface CustomFormProps {
    containerStyle?: StyleProp<ViewStyle>;
    pickerData: CountryProps[];
    initialValues: ValuesProps;
    onSuccess: () => void;
}

const STORAGE_KEY = 'rockerform';

/******  Form Component ********/

const CustomForm = ({
    containerStyle,
    pickerData,
    initialValues,
    onSuccess,
}: CustomFormProps) => {
    // HANDLE SUBMIT

    const handleSubmit = async (
        values: ValuesProps,
        actions: FormikHelpers<ValuesProps>,
    ) => {
        // Validate the SSN

        const isValidSSN = validateSSN(values.ssn);
        if (!isValidSSN) {
            actions.setFieldError('ssn', 'Invalid SSN');
        }

        // Validate Phone Number

        const isValidPhoneNumber = validatePhoneNumber(values.phoneNumber);
        if (!isValidPhoneNumber) {
            actions.setFieldError('phoneNumber', 'Invalid phone number');
        }

        // Success

        if (isValidSSN && isValidPhoneNumber) {
            onSuccess();
            await resetStorage(STORAGE_KEY);
            actions.setSubmitting(false);
            actions.resetForm();

            console.log('FORM SUCCESSFULLY SUBMITTED !!');
        }

        actions.setSubmitting(false);
    };

    return (
        <Formik
            // Use data from storage as initial values if app was interrupted before successuful submission
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                handleChange,
                handleSubmit,
                setFieldValue,
                errors,
                values,
                isSubmitting,
                touched,
                setFieldTouched,
            }) => {
                // Set form values to storage
                setDataToStorage(STORAGE_KEY, values);

                // Format the errors list into an array of strings
                const listErrors = Object.values(errors) as string[];

                return (
                    <KeyboardAwareScrollView
                        style={{ width: '100%' }}
                        contentContainerStyle={styles.formContainer}
                    >
                        <View style={[styles.contentContainer, containerStyle]}>
                            {/* Text Input for SSN, phone and Email */}
                            <TextInput
                                label="Social security number"
                                value={values.ssn}
                                maxLength={12}
                                keyboardType="number-pad"
                                onChangeText={handleChange('ssn')}
                                placeholder="yyyymmddxxxx"
                                onBlur={() => setFieldTouched('ssn', true)}
                            />
                            <TextInput
                                label="Phone number"
                                value={values.phoneNumber}
                                maxLength={13}
                                onChangeText={handleChange('phoneNumber')}
                                keyboardType="phone-pad"
                                placeholder="eg 076528452"
                                onBlur={() =>
                                    setFieldTouched('phoneNumber', true)
                                }
                            />
                            <TextInput
                                label="Email address"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email', true)}
                            />

                            {/* Divider */}
                            <View style={{ paddingVertical: 6 }} />

                            {/* Picker select countries */}
                            <Picker
                                data={pickerData}
                                onValueChange={(value) =>
                                    setFieldValue('country', value ? value : '')
                                }
                                selectedValue={values.country}
                                label="Your nationality"
                            />

                            {/* Render Errors messages */}
                            {listErrors.length !== 0 &&
                                Object.keys(touched).length >= 3 && (
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
                                disabled={isSubmitting}
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
