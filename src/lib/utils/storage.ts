import AsyncStorage from '@react-native-community/async-storage';

export const setDataToStorage = async (key: string, value: any) => {
    const serializedData = JSON.stringify(value);
    try {
        await AsyncStorage.setItem(key, serializedData);
    } catch (error) {
        console.log(error);
    }
};

export const getDataFromStorage = async (key: string) => {
    try {
        const res = await AsyncStorage.getItem(key);
        console.log('From Storage', res);
        if (!res) return null;

        const parsedData = JSON.parse(res);

        return parsedData;
    } catch (error) {
        await resetStorage(key);
        console.log(error);
    }
};

export const resetStorage = async (key: string) => {
    console.log('In reset storage');

    await AsyncStorage.removeItem(key);
};
