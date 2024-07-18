import { TextInput, StyleSheet, Text } from "react-native";

function InputText({ label, keyboardType, placeholder, onChangeText }) {
  return (
    <>
      <Text style={styles.header}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    paddingLeft: "2%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  header: {
    marginRight: "65%",
    fontWeight: "bold",
    paddingBottom: "2%",
    paddingTop: "5%",
    fontSize: 14,
  },
});

export default InputText;
