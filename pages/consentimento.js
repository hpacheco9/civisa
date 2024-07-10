import { StyleSheet, Text, View, CheckBox, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';


const Rgpd = () => {
  const [isChecked, setChecked] = useState(false);
  const navigator = useNavigation();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>RGPD</Text>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#000000' : undefined} />
        <Text> Li e aceito</Text>
      </View>
      {isChecked && (
        <TouchableOpacity style={styles.button} onPress={() => {
          navigator.navigate("Data e Hora")
        }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    overflow: 'scroll'

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20%'
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: '#FFFFFF',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '30%'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },


})
export default Rgpd;

