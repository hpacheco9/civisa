import React from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputText from "../components/inputText";
import Voltar from "../components/Voltar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  observations: Yup.string() // Adding validation for required field
});

const Obs = () => {
  const navigation = useNavigation(); // Move the useNavigation hook to the top level

  const handleFormSubmit = async (values) => {
    try {
      await AsyncStorage.setItem('observations', values.observations);
      navigation.navigate('Success'); // Use navigation here
    } catch (error) {
      console.error('Failed to save observations:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <View style={styles.voltarContainer}>
          <Voltar />
        </View>
        <View style={styles.container}>
          <Text style={styles.header}>Observações</Text>
          
          <Formik
            initialValues={{ observations: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <InputText
                  placeholder="Observação"
                  onChangeText={handleChange('observations')}
                  onBlur={handleBlur('observations')}
                  value={values.observations}
                  style={styles.input}
                />
                {touched.observations && errors.observations && (
                  <Text style={styles.errorText}>{errors.observations}</Text>
                )}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submeter</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: '40%',
    marginTop: '20%',
    marginBottom: '10%'
  },
  voltarContainer: {
    marginBottom: "5%",
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: "#FFFFFF",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "15%",
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Obs;
