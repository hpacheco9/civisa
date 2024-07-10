import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import InputText from '../components/inputText';
import InputDropdown from '../components/dropDown';

const Submeter = () => {
  const [concelho, setConcelho] = useState("");
  const [selectedFreguesia, setSelectedFreguesia] = useState("");

  const onChangeConcelho = (value) => {
    setSelectedFreguesia(null);
    setConcelho(value);
  }

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
      <InputText label="Introduza seu Nome" keyboardType="default" placeholder="Name" />
      <InputText label="Introduza seu contato" keyboardType="phone-pad" placeholder="Phone" />
      <InputText label="Introduza seu email" keyboardType="email-address" placeholder="Email" />
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
      <TouchableOpacity style={styles.button} >
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
    marginTop: '3%'
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
