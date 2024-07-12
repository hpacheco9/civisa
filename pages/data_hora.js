import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    if (currentDate <= new Date()) {
      setDate(currentDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const formatDate = (date) => {
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    const hours = (`0${time.getHours()}`).slice(-2);
    const minutes = (`0${time.getMinutes()}`).slice(-2);
    return `${hours}:${minutes}`;
  };

  const handleNext = async () => {

    const selectedDateTime = {
      date: formatDate(date),
      time: formatTime(time),
    };

    try {
      await AsyncStorage.setItem('@selectedDateTime', JSON.stringify(selectedDateTime));
      console.log('Selected Date and Time saved:', selectedDateTime);
    } catch (e) {
      console.error('Failed to save the data to AsyncStorage', e);
    }

    navigation.navigate('Perguntas');
  };

  return (
    <>
      <Text style={styles.header}>Data & Hora</Text>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Data</Text>

          <>
            <TouchableOpacity onPress={showDatepicker} style={styles.radioButton}>
              <Text style={styles.selectedValue}>{formatDate(date)}</Text>
            </TouchableOpacity>
          </>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.title}>Hora</Text>
          <>
            <TouchableOpacity onPress={showTimepicker} style={styles.radioButton}>
              <Text style={styles.selectedValue}>{formatTime(time)}</Text>
            </TouchableOpacity>
          </>
          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
              is24Hour={true}
            />
          )}
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: '10%',
    alignItems: 'center',
    overflow: 'scroll',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: '12%',
    paddingTop: '12%',
    alignSelf: 'flex-start',
  },
  selectedValue: {
    fontSize: 18,
    marginVertical: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: '15%',
    color: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  header: {
    marginTop: '30%',
    fontWeight: 'bold',
    fontSize: 32,
    marginLeft: '12%',
  }
});

export default CustomDateTimePicker;