import React from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import InputDropdown from "../components/dropDown";
import TopBar from "../components/topBar.jsx";
import locais from "../services/Locais.json";

const concelhos = locais.concelhos;
const freguesias = locais.freguesias;

const validationSchema = Yup.object().shape({
  concelho: Yup.string().required("Concelho é obrigatório"),
  freguesia: Yup.string().required("Freguesia é obrigatória"),
});

const Localizacao = () => {
  const navigation = useNavigation();

  const handleNext = async (values) => {
    const locationInfo = {
      concelho: values.concelho,
      freguesia: values.freguesia,
    };
    const userid =  await AsyncStorage.getItem('@user');
    const user = JSON.parse(userid);

    try {
      await AsyncStorage.setItem(
        "@locationInfo",
        JSON.stringify(locationInfo)
      );
      if (user != null){
        navigation.navigate('Obs');
      }
      else{
        navigation.navigate("Contactos");
      }
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
          <Text style={styles.header}>{`Localização \ndo sismo`}</Text>
          <Formik
            initialValues={{
              concelho: "",
              freguesia: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              handleNext(values);
            }}
          >
            {({
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
              <View style={styles.form}>
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
                {touched.concelho && errors.concelho && (
                  <Text style={styles.errorText}>{errors.concelho}</Text>
                )}
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
                {touched.freguesia && errors.freguesia && (
                  <Text style={styles.errorText}>{errors.freguesia}</Text>
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

export default Localizacao;