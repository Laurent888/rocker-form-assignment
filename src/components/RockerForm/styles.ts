import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'relative',
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '80%',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 100,

        alignSelf: 'center',
    },

    // Snackbar
    snackbarContent: {
        backgroundColor: '#09a31f',
    },
    snackbarWrapper: {
        position: 'absolute',
        top: 0,
    },
});
