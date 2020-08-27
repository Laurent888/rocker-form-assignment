import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ListProps {
    list: string[];
    color?: string;
}

const s = StyleSheet.create({
    container: {
        marginVertical: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 0.5,
    },
});

const ListMessages = ({ list, color = '#333' }: ListProps) => {
    console.log('Color', color);
    return (
        <View style={[s.container, { borderColor: color }]}>
            {list.map((message) => (
                <Text key={message} style={[{ color }]}>
                    {message}
                </Text>
            ))}
        </View>
    );
};

export default ListMessages;
