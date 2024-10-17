import { View, TextInput, StyleSheet, Text } from "react-native";

function InputText({ label, keyboardType, placeholder, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 50,
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  header: {
    fontWeight: "bold",
    paddingBottom: 8,
    paddingTop: 16,
    fontSize: 14,
  },
});

export default InputText;
