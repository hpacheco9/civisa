import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputText from '../components/inputText';
import InputDropdown from '../components/dropDown';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbr5ZT5RFqRCBE3oXR-UlsaLMW0McuxeQ",
  authDomain: "teste-e8fc1.firebaseapp.com",
  projectId: "teste-e8fc1",
  storageBucket: "teste-e8fc1.appspot.com",
  messagingSenderId: "636947299691",
  appId: "1:636947299691:web:89eec25d8a113bb961602e",
  measurementId: "G-GJLSMQBQZE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Submeter = () => {
  const [concelho, setConcelho] = useState("");
  const [selectedFreguesia, setSelectedFreguesia] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const onChangeConcelho = (value) => {
    setSelectedFreguesia(null);
    setConcelho(value);
  };

  const handleSubmit = async () => {
    const contacts = {
      name,
      phone,
      email,
      concelho,
      freguesia: selectedFreguesia
    };

    try {
      await AsyncStorage.setItem('@contacts', JSON.stringify(contacts));

      // Fetching other answers from AsyncStorage
      const selectedDateTime = await AsyncStorage.getItem('@selectedDateTime');
      const formAnswers = await AsyncStorage.getItem('@formAnswers');

      // Prepare data for Firestore
      const inquiryData = {
        selectedDateTime: selectedDateTime ? JSON.parse(selectedDateTime) : {},
        formAnswers: formAnswers ? JSON.parse(formAnswers) : {},
        contacts
      };

      // Save data to Firestore
      const docRef = await addDoc(collection(db, 'inquiries'), inquiryData);

      Alert.alert("Success", "Answers saved and exported to Firebase");
      navigation.navigate('Result');
    } catch (error) {
      console.error('Error saving data', error);
      Alert.alert("Error", "Failed to save data");
    }
  };

  const concelhos = [
    { label: 'Lagoa', value: 'Lagoa' },
    { label: 'Ponta Delgada', value: 'Ponta Delgada' },
    { label: 'Ribeira Grande', value: 'Ribeira Grande' },
    { label: 'Vila Franca do Campo', value: 'Vila Franca do Campo' },
    { label: 'Nordeste', value: 'Nordeste' },
    { label: 'Povoação', value: 'Povoação' },
    { label: 'Angra do Heroísmo', value: 'Angra do Heroísmo' },
    { label: 'Calheta', value: 'Calheta' },
    { label: 'Corvo', value: 'Corvo' },
    { label: 'Horta', value: 'Horta' },
    { label: 'Lajes das Flores', value: 'Lajes das Flores' },
    { label: 'Lajes do Pico', value: 'Lajes do Pico' },
    { label: 'Madalena', value: 'Madalena' },
    { label: 'Praia da Vitória', value: 'Praia da Vitória' },
    { label: 'Santa Cruz da Graciosa', value: 'Santa Cruz da Graciosa' },
    { label: 'Santa Cruz das Flores', value: 'Santa Cruz das Flores' },
    { label: 'São Roque do Pico', value: 'São Roque do Pico' },
    { label: 'Velas', value: 'Velas' },
    { label: 'Vila do Porto', value: 'Vila do Porto' },
  ];

  const freguesias = {
    'Lagoa': [
      { label: 'Água de Pau', value: 'Água de Pau' },
      { label: 'Rosário', value: 'Rosário' },
      { label: 'Rosto do Cão (Livramento)', value: 'Rosto do Cão (Livramento)' },
    ],
    'Ponta Delgada': [
      { label: 'Ponta Delgada (São Sebastião)', value: 'Ponta Delgada (São Sebastião)' },
      { label: 'Ponta Delgada (São José)', value: 'Ponta Delgada (São José)' },
    ],
    'Ribeira Grande': [
      { label: 'Ribeira Grande (Matriz)', value: 'Ribeira Grande (Matriz)' },
      { label: 'Ribeira Grande (Rabo de Peixe)', value: 'Ribeira Grande (Rabo de Peixe)' },
    ],
    'Vila Franca do Campo': [
      { label: 'Água de Alto', value: 'Água de Alto' },
      { label: 'Ribeira Seca', value: 'Ribeira Seca' },
    ],
    'Nordeste': [
      { label: 'Nordeste (São Pedro)', value: 'Nordeste (São Pedro)' },
      { label: 'Nordeste (Santana)', value: 'Nordeste (Santana)' },
    ],
    'Povoação': [
      { label: 'Povoação (Nossa Senhora dos Remédios)', value: 'Povoação (Nossa Senhora dos Remédios)' },
      { label: 'Povoação (São Pedro)', value: 'Povoação (São Pedro)' },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contacts</Text>
      <InputText
        label="Introduza seu Nome"
        keyboardType="default"
        placeholder="Name"
        onChangeText={setName}
      />
      <InputText
        label="Introduza seu contato"
        keyboardType="phone-pad"
        placeholder="Phone"
        onChangeText={setPhone}
      />
      <InputText
        label="Introduza seu email"
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={setEmail}
      />
      <InputDropdown
        label="Concelho"
        items={concelhos}
        placeholder={{ label: 'Selecione um Concelho...', value: null }}
        onValueChange={(value) => onChangeConcelho(value)}
      />
      <InputDropdown
        label="Freguesia"
        items={concelho ? freguesias[concelho] || [] : []}
        value={selectedFreguesia}
        placeholder={{ label: 'Selecione uma freguesia...', value: null }}
        onValueChange={(value) => {
          setSelectedFreguesia(value === null ? null : value);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submeter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    overflow: 'scroll'
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 32,
    marginRight: '40%',
    marginBottom: '5%'
  }
});

export default Submeter;
