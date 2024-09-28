import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from './firebase';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getFirestore } from "firebase/firestore";
import getUserByEmail from "../services/getuser";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "Password no mínimo 6 caracteres")
    .required("Password é obrigatório"),
});

const firestore = getFirestore();

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigation = useNavigation();
  const auth2 = getAuth();

  const formikRef = React.useRef();

  const resetLoginForm = useCallback(() => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setLoginError(null);
    setRememberMe(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetLoginForm();

    }, [resetLoginForm])
  );

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(auth2, email, password);
      const user = userCredential.user;

      if (rememberMe) {
        await AsyncStorage.setItem("@loggedOut", JSON.stringify(false));
      }

      const userData = await getUserByEmail(email);

      if (userData) {
        await AsyncStorage.setItem("@user", JSON.stringify(userData));
        await AsyncStorage.setItem("@loggedOut", "false");
        navigation.reset({
          index: 0,
          routes: [{ name: 'Inicio' }],
        });
      } else {
        setLoginError("User data not found. Please try again.");
      }
    } catch (error) {
      setLoginError("Login failed. Please check your email and password.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{ fontSize: height * 0.06, fontWeight: "bold", marginBottom: "30%" }}>CIVISA</Text>
        <Text style={styles.title}>Login</Text>
        <View>
          <Formik
            innerRef={formikRef}
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.form}>
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
                <Text style={styles.errorText}>
                  {touched.email && errors.email ? errors.email : " "}
                </Text>

                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Introduza a sua password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                <Text style={styles.errorText}>
                  {touched.password && errors.password ? errors.password : " "}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'space-between' }}>
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      style={[
                        styles.checkbox,
                        rememberMe && styles.checkedBoxBackground,
                      ]}
                      onPress={() => setRememberMe(!rememberMe)}
                    >
                      {rememberMe && (
                        <Text style={styles.checkedBoxText}>✓</Text>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>lembrar</Text>
                  </View>
                  <View style={{ marginLeft: '30%' }}>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Recuperar')
                    }}>
                      <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Recuperar password</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {loginError && <Text style={styles.errorText}>{loginError}</Text>}
                <View style={{ alignItems: 'center', marginRight: '17%' }}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      isSubmitting && styles.disabledButton,
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>
            )}
          </Formik>
        </View>
        <TouchableOpacity
          style={{ marginTop: "10%", marginLeft: "5%" }}
          onPress={async () => {
            await AsyncStorage.setItem(
              "@user",
              "null"
            );
            navigation.navigate("Inicio");
          }}
        >
          <Text style={{ textDecorationLine: "underline", textAlign: 'center', marginRight: 2 }}>
            Entrar como convidado
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: "8%", marginLeft: "5%" }}>
          <Text>Ainda não tem conta? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Registo");
            }}
          >
            <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
              {" "}
              Registe-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "25%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: height * 0.03,
    fontWeight: "bold",
    marginBottom: 10,
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
  errorText: {
    color: "red",
    height: 20,
    marginBottom: 10,
    marginTop: 10
  },
  button: {
    justifyContent: 'center',
    marginTop: "15%",
    backgroundColor: "#000000",
    width: 150,
    marginLeft: "25%",
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
    fontWeight: "bold",
    marginBottom: "3%",
    marginTop: "2%",
    fontSize: height * 0.017,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  checkedBoxBackground: {
    backgroundColor: "#000",
  },
  checkedBoxText: {
    fontSize: 14,
    color: "#fff",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;