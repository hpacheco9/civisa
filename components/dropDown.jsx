import React from "react";
import { Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const InputDropdown = ({
  label,
  items,
  placeholder,
  onValueChange,
  value,
  ...pickerProps
}) => {
  return (
    <>
      <Text style={styles.header}>{label}</Text>
      <Picker
        style={pickerSelectStyles.inputAndroid}
        selectedValue={value}
        onValueChange={onValueChange}
        {...pickerProps}
      >
        <Picker.Item label={placeholder.label} value={null} />
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginRight: "60%",
    fontWeight: "bold",
    paddingBottom: "2%",
    paddingTop: "5%",
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginLeft: "11%",
    width: 300,
    height: 50,
  },
});

export default InputDropdown;
