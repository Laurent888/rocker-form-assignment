import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import HomeScreen from './src/screens/HomeScreen';

import { store } from './src/lib/redux/store';

import { theme } from './src/lib/theme';
import Form from './src/components/Form';

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <ReduxProvider store={store}>
                <HomeScreen />
            </ReduxProvider>
        </PaperProvider>
    );
}
