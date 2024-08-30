import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env';
import Voltar from '../components/Voltar';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

let app;
let auth;
let firestore;

app = initializeApp(firebaseConfig);
auth = getAuth(app);
firestore = getFirestore(app);
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Primeiro nome é obrigatório'),
  lastName: Yup.string().required('Último nome é obrigatório'),
  email: Yup.string().email('Invalid email').required('Email é obrigatório'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password é obrigatório'),
  phone: Yup.string().matches(/^[0-9]{9}$/, 'O numero deve ter 9 digitos').required('Telemóvel é obrigatório'),
  acceptTerms: Yup.boolean().oneOf([true], 'Aceite os termos e condições')
});

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const navigation = useNavigation();

  const handleRegister = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user.uid;
      const fullName = values.firstName + ' ' + values.lastName;
      await setDoc(doc(firestore, 'users', user), {
        Name: fullName,
        phone: values.phone,
        email: values.email,
        acceptedTerms: values.acceptTerms,
      });
      navigation.replace('Registado');
      return;
    } catch (error) {
      console.error('Error registering user:', error.message);
      setRegisterError(error.message);
    }
  };

  return (
    <ScrollView>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>  
        <Voltar />
        <View style={styles.container}>
          <Text style={styles.title}>Registo</Text>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', phone: '', acceptTerms: false }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Primeiro Nome</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Introduza o seu primeiro nome"
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                  />
                  <View style={styles.errorContainer}>
                    {touched.firstName && errors.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Último Nome</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Introduza o seu último nome"
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                  <View style={styles.errorContainer}>
                    {touched.lastName && errors.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Introduza o seu email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <View style={styles.errorContainer}>
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Introduza a sua password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  <View style={styles.errorContainer}>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Telemóvel</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Introduza o seu número de telemóvel"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    keyboardType="phone-pad"
                  />
                  <View style={styles.errorContainer}>
                    {touched.phone && errors.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      values.acceptTerms && styles.checkedBoxBackground,
                    ]}
                    onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}
                  >
                    {values.acceptTerms && <Text style={styles.checkedBoxText}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>Aceito os termos e condições</Text>
                </View>
                <View style={styles.errorContainer}>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <Text style={styles.errorText}>{errors.acceptTerms}</Text>
                  )}
                </View>

                {registerError && (
                  <Text style={styles.errorText}>{registerError}</Text>
                )}

                <TouchableOpacity 
                  style={[styles.button, isSubmitting && styles.disabledButton]} 
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.buttonText}>
                    {isSubmitting ? "Registando..." : "Registar"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </>
    </TouchableWithoutFeedback>

    </ScrollView>
   
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: '33%',
    padding: 20,
    backgroundColor: "#ffffff",
  },
  logo: {
    fontSize: height * 0.06,
    fontWeight: 'bold',
    marginBottom: '10%',
    marginTop: '15%',
  },
  title: {
    fontSize: height * 0.03,
    fontWeight: "bold",
    marginBottom: 20,
    marginRight: '65%'
  },
  form: {
    width: "90%",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  errorContainer: {
    height: 20, // Fixed height for error messages
    justifyContent: 'center', // Center error text vertically
  },
  inputContainer: {
    marginBottom: 10, 
  },
  errorText: {
    color: "red",
    marginTop: 5, 
  },
  button: {
    marginTop: '5%',
    backgroundColor: "#000000",
    width: '50%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '3%',
    marginTop: '3%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
});

export default Register;