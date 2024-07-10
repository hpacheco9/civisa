import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const InputDropdown = ({ label, items, placeholder, onValueChange, ...pickerProps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{label}</Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={items}
        onValueChange={onValueChange}
        style={pickerSelectStyles}
        {...pickerProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '9%',
  },
  header: {
    marginRight: '75%',
    fontWeight: 'bold',
    paddingBottom: '2%',
    paddingTop: '5%',
    fontSize: 14
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    paddingLeft: '2%',
    width: 300,
    height: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default InputDropdown;
