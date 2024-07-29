import React from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputText from "../components/inputText";
import Voltar from "../components/Voltar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email("Formato de email inválido"),
});

const Contactos = () => {
  const navigation = useNavigation();
  const handleNext = async (values) => {
    const contactInfo = {
      name: values.name,
      phone: values.phone,
      email: values.email,
    };
  
    try {
      await AsyncStorage.setItem(
        "@contactInfo",
        JSON.stringify(contactInfo)
      );
      navigation.navigate("Localizacao");
      console.log("Contact Info saved:", contactInfo);
    } catch (e) {
      console.error("Failed to save the data to AsyncStorage", e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <View style={styles.voltarContainer}>
          <Voltar />
        </View>
        <View style={styles.container}>
          <Text style={styles.header}>Contactos</Text>
          <Formik
            initialValues={{
              name: "",
              phone: "",
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              setSubmitting(false);
              handleNext(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
              <View style={styles.form}>
                <InputText
                  label="Introduza seu Nome"
                  keyboardType="default"
                  placeholder="Nome"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <Text style={styles.label}>Telemóvel</Text>
                <InputText
                  label="Introduza seu contato"
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
                <InputText
                  label="Introduza seu email"
                  keyboardType="email-address"
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TouchableOpacity
                  style={[
                    styles.button,
                    (!isValid || isSubmitting) && styles.buttonDisabled
                  ]}
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                >
                  <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
              </View>
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
    width: '100%',
  },
  voltarContainer: {
    marginBottom: "5%",
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: '25%',
    width: '100%',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
  },
  header: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginLeft: '25%',
    marginBottom: height * 0.02,
    marginTop: '15%',
    width: '100%',
  },
  errorText: {
    color: "#8B0000",
    marginTop: 5,
    width: '75%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: '5%',
    marginBottom: '-9%',
    width: '100%',
    textAlign: 'left',
    marginLeft: '24%'
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: "#FFFFFF",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "15%",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Contactos;