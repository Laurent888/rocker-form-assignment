import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker as NativePicker } from '@react-native-community/picker';

interface CountryProps {
    label: string;
    value: string;
}

interface PickerProps {
    data: CountryProps[];
    onValueChange: (itemValue: string | number, itemIndex: number) => void;
    selectedValue: string;
}

const s = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginTop: 20,
    },
    picker: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        height: 50,
        width: '100%',
    },
});

const Picker = ({
    data,
    onValueChange,
    selectedValue = 'Country',
}: PickerProps) => {
    const renderData = data.map((item) => (
        <NativePicker.Item
            key={item.value}
            label={item.label}
            value={item.value}
        />
    ));

    return (
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
    );
};

export default Picker;
