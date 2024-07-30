import React from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputText from "../components/inputText";
import Voltar from "../components/Voltar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from "../services/Database.js";

const validationSchema = Yup.object().shape({
  observations: Yup.string()
});

const Obs = () => {
    const navigation = useNavigation();
  
  
    const handleFormSubmit = async (values, { setSubmitting }) => {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const userString = await AsyncStorage.getItem('@user');
        const  user = JSON.parse(userString);
        console.log(user.email, user.fullName, user.phone)
        if (user.userId != null){
          const contactInfo = {
            name: user.fullName,
            phone: user.phone,
            email: user.email,
          };
            await AsyncStorage.setItem(
              "@contactInfo",
              JSON.stringify(contactInfo)
            );
        }
      try {
        const contacts = await AsyncStorage.getItem('@contactInfo');
        const local = await AsyncStorage.getItem('@locationInfo');
        const form = await AsyncStorage.getItem('@formAnswers');
        const data = await AsyncStorage.getItem('@selectedDateTime');
        await AsyncStorage.setItem('observations', values.observations);
        const dataToStore = {
          contacts: JSON.parse(contacts),
          location: JSON.parse(local),
          formAnswers: JSON.parse(form),
          observations: values.observations,
          timestamp: JSON.parse(data),
        };
  
        const docRef = await addDoc(collection(db, 'submissions'), dataToStore);
        
        navigation.navigate('Success'); 
      } catch (error) {
        console.error('Failed to save data:', error);
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <View style={styles.voltarContainer}>
            <Voltar />
          </View>
          <View style={styles.container}>
            <Text style={styles.header}>Observações</Text>
            
            <Formik
              initialValues={{ observations: '' }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <>
                  <InputText
                    placeholder="Observação"
                    onChangeText={handleChange('observations')}
                    onBlur={handleBlur('observations')}
                    value={values.observations}
                    style={styles.input}
                    editable={!isSubmitting}
                  />
                  {touched.observations && errors.observations && (
                    <Text style={styles.errorText}>{errors.observations}</Text>
                  )}
                  <TouchableOpacity 
                    style={[styles.submitButton, isSubmitting && styles.disabledButton]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={styles.submitButtonText}>Submeter</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: '40%',
    marginTop: '20%',
    marginBottom: '10%'
  },
  voltarContainer: {
    marginBottom: "5%",
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: "#FFFFFF",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "15%",
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
});

export default Obs;