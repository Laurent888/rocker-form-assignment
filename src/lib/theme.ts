import { DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16a085',
        accent: '#3498db',
        errorSecondary: '#d42519',
    },
};
