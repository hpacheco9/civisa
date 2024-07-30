import React, { useState, useEffect } from "react";
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
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from "@env";
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  firestore = getFirestore(app);
} else {
  app = getApps()[0];
  auth = getAuth(app);
  firestore = getFirestore(app);
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Emil inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "Password no minimo 6 caracteres")
    .required("Password é obrigatório"),
});

const Login = () => {
  const navigation = useNavigation();
  const [loginError, setLoginError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    checkRememberedUser();
  }, []);

  const checkRememberedUser = async () => {
    try {
      const rememberedUser = await AsyncStorage.getItem("@rememberedUser");
      if (rememberedUser) {
        const { email, password } = JSON.parse(rememberedUser);
        handleLogin({ email, password }, { setSubmitting: () => {} });
      }
    } catch (error) {
      console.error("Error checking remembered user:", error);
    }
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        await AsyncStorage.setItem(
          "@user",
          JSON.stringify({
            userId: user.uid,
            email: user.email,
            fullName: userData.fullName,
            phone: userData.phone,
          })
        );

        if (rememberMe) {
          await AsyncStorage.setItem(
            "@rememberedUser",
            JSON.stringify({
              email: values.email,
              password: values.password,
            })
          );
        } else {
          await AsyncStorage.removeItem("@rememberedUser");
        }

        const storedUser = await AsyncStorage.getItem("@user");
        console.log("Stored user:", storedUser);
        navigation.navigate("Inicio");
      } else {
        console.log("No user data found in Firestore");
        setLoginError("User data not found. Please contact support.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{ fontSize: height * 0.06, fontWeight: "bold", marginBottom: "30%" }}>CIVISA</Text>
        <Text style={styles.title}>Login</Text>
        <Formik
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
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Introduza a sua password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
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
                <Text style={styles.checkboxLabel}>Lembrar-me</Text>
              </View>
              {loginError && <Text style={styles.errorText}>{loginError}</Text>}
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
          )}
        </Formik>
        <TouchableOpacity
          style={{ marginTop: "10%", marginLeft: "5%" }}
          onPress={async () => {
            await AsyncStorage.setItem(
              "@user",
              JSON.stringify({
                userId: null,
              })
            );
            navigation.navigate("Inicio");
          }}
        >
          <Text style={{ textDecorationLine: "underline", textAlign: 'center'}}>
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

const { height, width } = Dimensions.get("window");
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
    marginTop: "15%",
    backgroundColor: "#000000",
    width: "50%",
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
    marginTop: "3%",
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
  },
});

export default Login;
