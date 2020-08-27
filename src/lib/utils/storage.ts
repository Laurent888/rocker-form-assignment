import AsyncStorage from '@react-native-community/async-storage';

export const setDataToStorage = async (data: any) => {
    const serializedData = JSON.stringify(data);
    try {
        await AsyncStorage.setItem('rockerform', serializedData);
    } catch (error) {
        console.log(error);
    }
};

export const getDataFromStorage = async () => {
    try {
        const res = await AsyncStorage.getItem('rockerform');

        if (!res) return null;

        const parsedData = JSON.parse(res);

        return parsedData;
    } catch (error) {
        console.log(error);
    }
};

export const resetStorage = async () => {
    await AsyncStorage.removeItem('rockerform');
};
