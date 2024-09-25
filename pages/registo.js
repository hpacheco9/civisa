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
import { ScrollView } from 'react-native-gesture-handler';
import CustomCheckbox from '../components/accept';

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
  Name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Invalid email').required('Email é obrigatório'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password é obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords não coincidem')
    .required('Confirme a password'),
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
      await setDoc(doc(firestore, 'users', user), {
        Name: values.Name,
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
      <>  
        <Voltar />
        <View style={{backgroundColor: '#ffffff', height: height * 0.15}}></View>
        <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Registo</Text>
          <Formik
            initialValues={{Name: '', email: '', password: '', confirmPassword: '', phone: '', acceptTerms: false }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nome</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Introduza o seu nome completo"
                    onChangeText={handleChange("Name")}
                    onBlur={handleBlur("Name")}
                    value={values.Name}
                  />
                  <View style={styles.errorContainer}>
                    {touched.Name && errors.Name && (
                      <Text style={styles.errorText}>{errors.Name}</Text>
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
                <View style={{marginTop: '10%'}}>
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
                        <Text style={styles.label}>Confirmar Password</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Confirme a sua password"
                          onChangeText={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          value={values.confirmPassword}
                          secureTextEntry
                        />
                        <View style={styles.errorContainer}>
                          {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                          )}
                        </View>
                    </View>
                </View>
                <CustomCheckbox
                  value={acceptTerms}
                  onValueChange={setAcceptTerms}
                />

               

               
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
        
        </TouchableWithoutFeedback>
        </ScrollView>
        <View style={{backgroundColor: '#ffffff', height: 20}}></View>
      </>
  
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: '5%',
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
    height: 20, 
    justifyContent: 'center', 
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
    fontSize: height * 0.017,
  },

});

export default Register;