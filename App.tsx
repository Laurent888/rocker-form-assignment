import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { StatusBar } from 'react-native';

import RockerForm from './src/components/RockerForm/RockerForm';

import { store } from './src/lib/redux/store';

import { theme } from './src/lib/theme';

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <ReduxProvider store={store}>
                <StatusBar barStyle="default" />
                <RockerForm />
            </ReduxProvider>
        </PaperProvider>
    );
}
