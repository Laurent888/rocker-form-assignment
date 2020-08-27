import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const addNumbers = (number: number) => {
    const newNumber = number.toString().split('');
    const firstDigit = parseInt(newNumber[0], 10);
    const secondDigit = parseInt(newNumber[1], 10);
    return firstDigit + secondDigit;
};

export const validateSSN = (ssn: string) => {
    let isValid;

    const checkDigitFronSSN = parseInt(ssn.split('')[11], 10);

    // Get the birthday, month and day
    const birthDateString = [...ssn.split('').slice(0, 8)].join('');
    const month = parseInt(birthDateString.slice(4, 6), 10);
    const day = parseInt(birthDateString.slice(6, 8), 10);

    // If month or day are not valid, return false
    if (month > 12 || day > 31) {
        return (isValid = false);
    }

    // If birthday is superior to current date, return fase
    const birthDate = parseInt(
        dayjs(birthDateString, 'YYYYMMDD').format('YYYYMMDD'),
        10,
    );
    const currentDate = parseInt(dayjs().format('YYYYMMDD'), 10);

    if (currentDate < birthDate) {
        return (isValid = false);
    }

    // Calculate the Check digit
    const ssnArray = ssn.split('').slice(2, 11);

    const newArrayMultipliedByTwo = ssnArray.map((char, index) => {
        if (index % 2 === 0) {
            const double = parseInt(char, 10) * 2;

            return double >= 10 ? addNumbers(double) : double;
        } else {
            return parseInt(char, 10) * 1;
        }
    });

    const sumOfArray = newArrayMultipliedByTwo.reduce(
        (acc, current) => current + acc,
    );

    const lastDigit = parseInt(sumOfArray.toString().split('')[1], 10);
    const checkDigit = 10 - lastDigit;

    // If check digits are difference, return false
    if (checkDigitFronSSN !== checkDigit) return (isValid = false);

    return (isValid = true);
};
