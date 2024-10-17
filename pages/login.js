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
  Switch,
} from "react-native";
import { getFirestore } from "firebase/firestore";
import getUserByEmail from "../services/getuser";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async (userData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth2, userData.email, userData.password);
      const user = userCredential.user;
      const userDataFromFirestore = await getUserByEmail(user.email);

      if (userDataFromFirestore) {
        await AsyncStorage.setItem("@user", JSON.stringify(userDataFromFirestore));

        if (rememberMe) {
          await AsyncStorage.setItem("@loggedOut", "false");
        }

        navigation.replace("Inicio");

      } else {
        console.error('User data not found in Firestore');
        setLoginError("User data not found");
      }
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
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

                {/* Password Field */}
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={{ flex: 1 }} 
                    placeholder="Introduza a sua password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.errorText}>
                  {touched.password && errors.password ? errors.password : " "}
                </Text>

                <View style={styles.switchContainer}>
                  <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    trackColor={{ false: "#767577", true: "#000000" }}
                    thumbColor={rememberMe ? "#ffffff" : "#f4f3f4"}  
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} 
                  />
                  <Text style={styles.checkboxLabel}>   Lembrar-me</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Recuperar')} style={styles.forgotPassword}>
                    <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Recuperar password</Text>
                  </TouchableOpacity>
                </View>

                {loginError && <Text style={styles.loginErrorText}>{loginError}</Text>}

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
        </View>

        <TouchableOpacity
          style={styles.guestLink}
          onPress={async () => {
            await AsyncStorage.removeItem("@user");
            navigation.navigate("Inicio");
          }}
        >
          <Text style={{ textDecorationLine: "underline", textAlign: 'center' }}>
            Entrar como convidado
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text>Ainda não tem conta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Registo")}
          >
            <Text style={styles.registerLink}>
              {" "} Registe-se
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
    width: 330,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#000",
    color: "black",
  },
  errorText: {
    color: "red",
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  loginErrorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10, 
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: '10%', 
    backgroundColor: "#000000",
    width: 150,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    height: 50,
    width: 330,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#000",
    color: "black",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontWeight: "bold",
    marginRight: 10, // Adjust spacing between the label and switch
  },
  forgotPassword: {
    marginLeft: 'auto',
  },
  guestLink: {
    marginTop: "10%",
    marginLeft: "5%",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: "8%",
    marginLeft: "5%",
  },
  registerLink: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default Login;
