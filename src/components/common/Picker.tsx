import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import NativePicker from 'react-native-picker-select';
import { theme } from '../../lib/theme';

export interface CountryProps {
    label: string;
    value: string;
}

interface PickerProps {
    data: CountryProps[];
    onValueChange: (itemValue: string | number, itemIndex: number) => void;
    selectedValue: string;
    label?: string;
}

const s = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#f7f7f7',
        borderRadius: 2,
    },
    picker: {
        paddingVertical: 5,
        paddingHorizontal: Platform.OS === 'ios' ? 12 : 5,
        height: 50,
        width: '100%',
        justifyContent: 'center',
    },
    inputContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    input: {
        fontSize: 17,
        color: theme.colors.text,
    },
    label: {
        paddingVertical: 2,
        paddingHorizontal: 7,
        fontSize: 12,
        color: '#777',
    },
});

const Picker = ({
    data,
    onValueChange,
    selectedValue = 'Country',
    label,
}: PickerProps) => {
    return (
        <>
            {label && <Text style={s.label}>{label}</Text>}
            <View style={s.container}>
                <NativePicker
                    onValueChange={onValueChange}
                    value={selectedValue}
                    items={data}
                    style={{
                        viewContainer: s.picker,
                        inputIOSContainer: s.inputContainer,
                        inputAndroidContainer: s.inputContainer,
                        inputIOS: s.input,
                        inputAndroid: s.input,
                    }}
                />
            </View>
        </>
    );
};

export default Picker;
