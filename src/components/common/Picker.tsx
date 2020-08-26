import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker as NativePicker } from "@react-native-community/picker";

interface CountryProps {
  label: string;
  value: string;
}

interface PickerProps {
  data: CountryProps[];
}

const s = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "red",
  },
  picker: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 50,
    width: 200,
  },
});

const Picker = ({ data }: PickerProps) => {
  const renderData = data.map((item) => (
    <NativePicker.Item key={item.value} label={item.label} value={item.value} />
  ));

  return (
    <View style={s.container}>
      <NativePicker style={s.picker}>{renderData}</NativePicker>;
    </View>
  );
};

export default Picker;
