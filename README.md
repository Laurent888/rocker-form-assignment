# Rocker assignment: Form

## Technologies

-   **React Native**
-   **Expo**
-   **Typescript**
-   **Redux | Redux Saga**

## Helper packages

-   **React Native Paper**: UI Library
-   **Formik, Yup**: Formik to manage the form and Yup input validation
-   **Telefonnummer**: Used to validate swedish phone number
-   **Axios**: Used to fetch data
-   **Dayjs**: Used to handle and format Dates

## Some highlights

-   **Social Social Number**: Although there was a package available on npm to verify swedish SSN, I wanted to try doing it in plain javascript with the help of Day.js package.
-   **Phone number**: The phone number validation is handled by the package Telefonnummer
-   **Email**: Email is validate by Yup.
-   **Countries**: Countries are fetched and stored on App start by Axios, Redux and Redux Saga

## Installation

Install the dependencies and scan the QR code with Expo

```
yarn install
expo start
```

### Estimated time to complete: 7 hours
