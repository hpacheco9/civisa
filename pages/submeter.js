import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputText from "../components/inputText";
import InputDropdown from "../components/dropDown";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Formik } from "formik";
import locais from "../services/Locais.json";
import * as Yup from "yup";
import firebaseConfig from "../services/Database";
import Voltar from "../components/Voltar";
import NetInfo from "@react-native-community/netinfo";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Submeter = () => {
  const navigation = useNavigation();
  const concelhos = locais.concelhos;
  const freguesias = locais.freguesias;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(9, "Phone must be at least 9 characters")
      .max(9, "Phone must be at most 9 characters"),
    email: Yup.string().email("Invalid email format"),
    concelho: Yup.string().required("Concelho is required"),
    freguesia: Yup.string().required("Freguesia is required"),
  });

  const handleSubmit = async (values, actions) => {
    const contacts = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      concelho: values.concelho,
      freguesia: values.freguesia,
    };
    const netInfo = await NetInfo.fetch();
    try {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      await AsyncStorage.setItem("@contacts", JSON.stringify(contacts));
      const selectedDateTime = await AsyncStorage.getItem("@selectedDateTime");
      const formAnswers = await AsyncStorage.getItem("@formAnswers");

      if (!netInfo.isConnected) {
        throw new Error("Device is not connected to the internet.");
      }

      const inquiryData = {
        selectedDateTime: selectedDateTime ? JSON.parse(selectedDateTime) : {},
        formAnswers: formAnswers ? JSON.parse(formAnswers) : {},
        contacts,
      };

      const docRef = await addDoc(collection(db, "inquiries"), inquiryData);

      Alert.alert("Submetido", "O seu inquérito foi submetido com sucesso");
      actions.resetForm();
      navigation.navigate("Inicio");
    } catch (error) {
      console.error("Error saving data", error);
      Alert.alert("Erro", "Verifique a sua ligação à internet");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <View style={styles.voltarContainer}>
          <Text style={styles.header}>Contactos</Text>
          <Voltar />
        </View>
        <View style={styles.container}>
          
          <Formik
            initialValues={{
              name: "",
              phone: "",
              email: "",
              concelho: "",
              freguesia: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
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
                {touched.name && errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}

                <InputText
                  label="Introduza seu contato"
                  keyboardType="phone-pad"
                  placeholder="Telemóvel"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}

                <InputText
                  label="Introduza seu email"
                  keyboardType="email-address"
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                <InputDropdown
                  label="Concelho"
                  items={concelhos}
                  placeholder={{ label: "Selecione um Concelho...", value: null }}
                  onValueChange={(value) => {
                    setFieldValue("concelho", value);
                    setFieldValue("freguesia", null);
                  }}
                  value={values.concelho}
                />
                {touched.concelho && errors.concelho ? (
                  <Text style={styles.errorText}>{errors.concelho}</Text>
                ) : null}

                <InputDropdown
                  label="Freguesia"
                  items={values.concelho ? freguesias[values.concelho] || [] : []}
                  value={values.freguesia}
                  placeholder={{
                    label: "Selecione uma freguesia...",
                    value: null,
                  }}
                  onValueChange={(value) => setFieldValue("freguesia", value)}
                />
                {touched.freguesia && errors.freguesia ? (
                  <Text style={styles.errorText}>{errors.freguesia}</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.buttonText}>Submeter</Text>
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
    alignItems: 'center',
  
  },
  voltarContainer: {
    marginBottom: "5%",
    position: 'absolute',
    flexDirection: 'row',
    marginTop: '5%',
    marginRight: '10%',
    left: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '10%',
    width: '100%', 
  },
  form: {
    width: '98%', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: "7%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  header: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: 'center',
    marginLeft: '35%',
    marginTop: '20%'
  },
  errorText: {
    color: "#8B0000",
    marginTop: 5,
    width: '75%', 
  },
});

export default Submeter;
