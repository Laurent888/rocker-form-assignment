import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as InputPaper } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

interface InputProps extends TextInputProps {}

const TextInput = ({ ...props }: InputProps) => {
    return (
        <View>
            <InputPaper mode="outlined" {...props} />
        </View>
    );
};

export default TextInput;

const styles = StyleSheet.create({});
