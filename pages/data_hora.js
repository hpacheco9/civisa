import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';


const CustomDateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const showDatepicker = () => {
    setShowPicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false); // Hide the date picker after selection
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

 
   



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={handleDateChange}
        style={styles.input}
      />
      <Text style={styles.title}>Hora</Text>
      <DateTimePicker
        value={time}
        mode="time"
        display="default"
        onChange={handleTimeChange}
        style={styles.input}
      />
      <Button title='Next' onPress={() => navigation.navigate('Perguntas')}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginRight: '40%',
    color: 'white',
    backgroundColor: 'white',
    color: '#FFFFFF', 
    borderColor: 'red',
    opacity: 1,  
    width: 250
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: '7%',
    marginTop: '7%'
  }
});

export default CustomDateTimePicker;
