import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from './src/lib/theme';
import Form from './src/components/Form';

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ marginTop: 50 }}
            >
                <StatusBar style="auto" />
                <Form />
            </ScrollView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
});
