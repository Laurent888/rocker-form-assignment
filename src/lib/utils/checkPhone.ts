import { validator, parse } from 'telefonnummer';

export const validatePhoneNumber = (number: string) => {
    const isValid = validator(number);
    return isValid;
};
