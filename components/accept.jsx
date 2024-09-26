import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomCheckbox = ({ value, onValueChange, label, linkText, linkDestination }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          value && styles.checkedBoxBackground,
        ]}
        onPress={() => onValueChange(!value)}
      >
        {value && <Text style={styles.checkedBoxText}>✓</Text>}
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text>{label}</Text>
        {linkText && (
          <TouchableOpacity onPress={() => navigation.navigate(linkDestination)}>
            <Text style={styles.checkboxLabel}>{linkText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checkedBoxBackground: {
    backgroundColor: '#000',
  },
  checkedBoxText: {
    color: '#fff',
    fontSize: 14,
  },
  checkboxLabel: {
    marginLeft: 8,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
});

export default CustomCheckbox;