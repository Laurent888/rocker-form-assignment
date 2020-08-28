import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker as NativePicker } from '@react-native-community/picker';

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
        paddingHorizontal: 5,
        height: 50,
        width: '100%',
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
    const renderData = data.map((item) => (
        <NativePicker.Item
            key={item.value}
            label={item.label}
            value={item.value}
        />
    ));

    return (
        <>
            {label && <Text style={s.label}>{label}</Text>}
            <View style={s.container}>
                <NativePicker
                    onValueChange={onValueChange}
                    selectedValue={selectedValue}
                    style={s.picker}
                >
                    <NativePicker.Item
                        label="Please select an option..."
                        value=""
                    />
                    {renderData}
                </NativePicker>
            </View>
        </>
    );
};

export default Picker;
