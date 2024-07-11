import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
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
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleNext = async () => {
    // Save the date and time to AsyncStorage
    const selectedDateTime = {
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString(),
    };
    
    try {
      await AsyncStorage.setItem('@selectedDateTime', JSON.stringify(selectedDateTime));
      console.log('Selected Date and Time saved:', selectedDateTime);
    } catch (e) {
      console.error('Failed to save the data to AsyncStorage', e);
    }

    // Navigate to the next screen
    navigation.navigate('Perguntas');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Data</Text>
        {Platform.OS === 'android' && (<>
          <TouchableOpacity onPress={showDatepicker} style={styles.radioButton}>
            <Text style={styles.selectedValue}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </>)}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.title}>Hora</Text>
        {Platform.OS === 'android' && (<>
          <TouchableOpacity onPress={showTimepicker} style={styles.radioButton}>
            <Text style={styles.selectedValue}>{date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        </>)}
        {showTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <TouchableOpacity
          onPress={handleNext}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: '20%',
    alignItems: 'center',
    overflow: 'scroll',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: '7%',
    paddingTop: '12%',
    paddingBottom: '10%',
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
    marginTop: "50%",
    color: '#FFFFFF'
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
    width: 300
  },
});

export default CustomDateTimePicker;