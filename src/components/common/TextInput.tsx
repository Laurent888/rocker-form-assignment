import React, { ChangeEvent } from 'react';
import { StyleSheet, View, TextInputProps } from 'react-native';
import { TextInput as InputPaper } from 'react-native-paper';

interface InputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (e: string | ChangeEvent<any>) => void;
}

const s = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});

const TextInput = ({ ...props }: InputProps) => {
    return (
        <View style={s.container}>
            <InputPaper mode="outlined" {...props} />
        </View>
    );
};

export default TextInput;
