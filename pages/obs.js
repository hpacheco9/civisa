import React, { useState } from "react";
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, TextInput, Alert } from "react-native";
import Voltar from "../components/Voltar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from "../services/Database.js";
import CustomCheckbox from "../components/accept.jsx";

const Obs = () => {
  const navigation = useNavigation();
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async () => {
    if (!acceptTerms) {
      setShowError(true);
      return;
    }
    setIsSubmitting(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const userString = await AsyncStorage.getItem('@user');
    const user = JSON.parse(userString);
    if (user != null) {
      const contactInfo = {
        name: user.Name,
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
      await AsyncStorage.setItem('observations', observations);
      const dataToStore = {
        contacts: JSON.parse(contacts),
        location: JSON.parse(local),
        formAnswers: JSON.parse(form),
        observations: observations,
        timestamp: JSON.parse(data),
      };
      await addDoc(collection(db, 'submissions'), dataToStore);
      navigation.navigate('Success');
    } catch (error) {
      console.error('Failed to save data:', error);
      Alert.alert("Erro", "Falha ao salvar os dados. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
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
          <TextInput
            placeholder="Digite suas observações aqui"
            onChangeText={setObservations}
            value={observations}
            style={styles.input}
            editable={!isSubmitting}
            multiline={true}
            textAlignVertical="top"
          />
          <CustomCheckbox
            value={acceptTerms}
            onValueChange={(newValue) => {
              setAcceptTerms(newValue);
              setShowError(false);
            }}
            label="  Li e aceito os"
            linkText="termos e condições"
            linkDestination="RGPD"
          />
          {showError && (
            <Text style={styles.errorText}>
              Por favor, aceite os termos e condições para continuar.
            </Text>
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
    height: 100,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Obs;