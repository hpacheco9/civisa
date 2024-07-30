import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env';
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  firestore = getFirestore(app);
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const navigation = useNavigation();
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        await AsyncStorage.setItem('@user', JSON.stringify({
          userId: user.uid,
          email: user.email,
          fullName: userData.fullName,
          phone: userData.phone,
        }));
        const storedUser = await AsyncStorage.getItem('@user');
        console.log('Stored user:', storedUser);
        navigation.navigate('Inicio');
      } else {
        console.log('No user data found in Firestore');
        setLoginError('User data not found. Please contact support.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{fontSize: height*0.06, fontWeight: 'bold', marginBottom: '30%'}}>CIVISA</Text>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="introduza a seu email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="introduza a sua password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              {loginError && (
                <Text style={styles.errorText}>{loginError}</Text>
              )}
              <TouchableOpacity 
                style={[styles.button, isSubmitting && styles.disabledButton]} 
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>
             
            </View>
          )}
        </Formik>
        <TouchableOpacity style={{marginTop: '5%', marginLeft: '5%'}} onPress={ async () =>{
                 await AsyncStorage.setItem('@user', JSON.stringify({
                  userId: null,
                }));

              }}>
                <Text style={{textDecorationLine: 'underline'}}>Entrar como convidado</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', marginTop: '4%', marginLeft: '5%'}}>
              <Text >Ainda não tem conta? </Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Registro')
              }}>
              <Text style={{textDecorationLine: 'underline'}}> Registe-se</Text>
              </TouchableOpacity>
              </View>
      </View>
    </TouchableWithoutFeedback>
  );


};





const {height, width} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '25%',
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: height*0.03,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "90%",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: '5%',
    backgroundColor: "#000000",
    width: '50%',
    marginLeft: '25%',
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
  label : {
    fontWeight: 'bold',
    marginBottom: '3%',
    marginTop: '3%',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  }
});

export default Login;