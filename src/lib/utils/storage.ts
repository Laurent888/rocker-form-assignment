import AsyncStorage from '@react-native-community/async-storage';

export const setDataToStorage = async (key: string, value: any) => {
    const serializedData = JSON.stringify(value);
    try {
        await AsyncStorage.setItem(key, serializedData);
    } catch (error) {
        await resetStorage(key);
    }
};

export const getDataFromStorage = async (key: string) => {
    try {
        const res = await AsyncStorage.getItem(key);

        if (!res) return null;

        const parsedData = JSON.parse(res);

        return parsedData;
    } catch (error) {
        await resetStorage(key);
    }
};

export const resetStorage = async (key: string) => {
    await AsyncStorage.removeItem(key);
};
