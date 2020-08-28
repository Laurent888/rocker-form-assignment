import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import RockerForm from '../components/RockerForm/RockerForm';

const HomeScreen = () => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            <RockerForm />
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f7f7f7',
    },
    contentContainerStyle: {
        paddingTop: 30,
        paddingBottom: 50,
    },
});
