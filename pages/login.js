import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from './firebase';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getFirestore, query, where, getDocs, collection } from "firebase/firestore";


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "Password no mínimo 6 caracteres")
    .required("Password é obrigatório"),
});
const firestore = getFirestore();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const checkUserStatus = async () => {
      const isLoggedOut = await AsyncStorage.getItem("@loggedOut");
      if (isLoggedOut === "true") {
        setLoading(false);
        return;
      }
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          navigation.navigate("Inicio");
        } else {
          setLoading(true);
        }
      });
    };
  
    checkUserStatus();
  }, []);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        const stringValue = JSON.stringify(false);
        await AsyncStorage.setItem("@loggedOut",stringValue);
      } 
      const user = await getUserByEmail(email);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      navigation.navigate("Inicio");
    } catch (error) {
      setLoginError("Login failed. Please check your email and password.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const q = query(collection(firestore, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No user found with this email.');
        return null;
      } else {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log('User data:', userData);
        return userData;
      }
    } catch (error) {
      console.error('Error fetching user by email:', error.message);
    }
  };

 
  return (
    <>
    {loading ?( <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
    ): (
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
              "null"
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
    )}
    </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
