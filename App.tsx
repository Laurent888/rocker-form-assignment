import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { StatusBar } from 'react-native';

import { store } from './src/lib/redux/store';

import { theme } from './src/lib/theme';

import HomeScreen from './src/screens/HomeScreen';

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <ReduxProvider store={store}>
                <StatusBar barStyle="default" />

                <HomeScreen />
            </ReduxProvider>
        </PaperProvider>
    );
}
