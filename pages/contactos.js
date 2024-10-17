import React from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputText from "../components/inputText";
import TopBar from "../components/topBar.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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
      navigation.navigate("Obs");
    } catch (e) {
      console.error("Failed to save the data to AsyncStorage", e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeArea}>
        <TopBar/>
      <ScrollView>
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
                  label="Introduza o seu Nome"
                  keyboardType="default"
                  placeholder="Nome"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <InputText
                  label="Introduza o seu Contacto"
                  keyboardType="phone-pad"
                  placeholder="Telemóvel"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
                <InputText
                  label="Introduza o seu Email"
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
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    width: '100%',
    marginBottom: "5%",
  },
  errorText: {
    color: "#8B0000",
    marginTop: 5,
    width: '75%',
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
    marginBottom: "5%",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Contactos;
