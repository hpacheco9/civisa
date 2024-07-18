import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
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
      Alert.alert("Erro", "Falha ao enviar o inquérito");
    }
  };

  return (
    <>
      <View style={{ marginBottom: "15%" }}>
        <Voltar />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Contacts</Text>
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
            <>
              <InputText
                label="Introduza seu Nome"
                keyboardType="default"
                placeholder="Name"
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
                placeholder="Phone"
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

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submeter</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
    marginTop: "10%",
    marginBottom: "5%",
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: "10%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  header: {
    fontWeight: "bold",
    fontSize: 32,
    marginRight: "40%",
    marginBottom: "5%",
  },
  errorText: {
    color: "#8B0000",
    marginTop: "1%",
    marginRight: "45%",
  },
  voltar: {
    marginTop: "22%",
    marginLeft: "7%",
  },
  voltarText: {
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

export default Submeter;
