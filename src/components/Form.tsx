import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "./common/Button";
import TextInput from "./common/TextInput";
import Picker from "./common/Picker";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 500,
    width: "80%",
  },
  title: {
    fontSize: 25,
    paddingVertical: 5,
  },
});

const initialValues = {
  ssn: "",
  phoneNumber: "",
  email: "",
  country: "",
};

const mockData = [
  {
    label: "France",
    value: "france",
  },
  {
    label: "Germany",
    value: "germany",
  },
  {
    label: "Spain",
    value: "spain",
  },
];

const validationSchema = Yup.object({
  ssn: Yup.string().required(),
  phoneNumber: Yup.number().required(),
  email: Yup.string().email("Invalid email format").required(),
  country: Yup.string().required(),
});

const CustomForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
        values,
      }) => {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Rocker Form</Text>

            {/* Text Input for SSN, phone and Email */}
            <TextInput
              label="Social security number"
              value={values.ssn}
              onChangeText={handleChange("ssn")}
            />
            <TextInput
              label="Phone number"
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
            />
            <TextInput
              label="Email address"
              value={values.email}
              onChangeText={handleChange("email")}
            />

            {/* Picker select countries */}
            <Picker data={mockData} />

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{ marginTop: 20 }}
            >
              Send
            </Button>
          </View>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
