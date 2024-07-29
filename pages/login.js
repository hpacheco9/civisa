import React, { useState } from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Inicio')
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
              <View style={styles.checkboxContainer}>
              </View>
              <TouchableOpacity 
                style={[styles.button, isSubmitting && styles.disabledButton]} 
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={{width: '70%', marginLeft: '25%'}} onPress={ async () =>{
    
                const user = {
                    userId : null
                  };
              
                  try {
                    await AsyncStorage.setItem(
                      "@user",
                      JSON.stringify(user)
                    );
                    navigation.navigate("Inicio");
                  } catch (e) {
                    console.error("Failed to save the data to AsyncStorage", e);
                  }
              }}
              >
               <Text style={{ 
                    marginTop: '10%', 
                    textDecorationLine: 'underline', 
                    textDecorationColor: 'black', 
                    textDecorationStyle: 'solid' 
                }}>
                Entrar como convidado
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
    marginTop: '10%',
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
