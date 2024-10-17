import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Iconify } from "react-native-iconify"
import TopBar from "../components/topBar.jsx";

export default function CustomDateTimePicker() {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const navigation = useNavigation()

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(false)
    if (currentDate <= new Date()) {
      setDate(currentDate)
    }
  }

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time
    setShowTimePicker(false)
    setTime(currentTime)
  }

  const formatDate = (date) => {
    const day = `0${date.getDate()}`.slice(-2)
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const formatTime = (time) => {
    const hours = `0${time.getHours()}`.slice(-2)
    const minutes = `0${time.getMinutes()}`.slice(-2)
    return `${hours}:${minutes}`
  }

  const handleNext = async () => {
    const selectedDateTime = {
      date: formatDate(date),
      time: formatTime(time),
    }

    try {
      await AsyncStorage.setItem(
        "@selectedDateTime",
        JSON.stringify(selectedDateTime)
      )
      navigation.navigate("Perguntas")
      console.log("Selected Date and Time saved:", selectedDateTime)
    } catch (e) {
      console.error("Failed to save the data to AsyncStorage", e)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar/>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Data e Hora</Text>
          <Text style={styles.title}>Data do sismo</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
            <Text style={styles.selectedValue}>{formatDate(date)}</Text>
            <Iconify
              icon="ph:calendar-light"
              size={height * 0.05}
              color={'black'}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
          <Text style={styles.title}>Hora do sismo</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputContainer}>
            <Text style={styles.selectedValue}>{formatTime(time)}</Text>
            <Iconify
              icon="ph:clock-light"
              size={height * 0.05}
              color={'black'}
            />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
              is24Hour={true}
            />
          )}
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: "5%",
    alignItems: "center",
    overflow: "scroll",
    paddingVertical: "5%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: "12%",
    paddingTop: "10%",
    alignSelf: "flex-start",
  },
  selectedValue: {
    fontSize: 18,
    marginVertical: 10,
    color: "#000000",
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: "15%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  header: {
    fontWeight: "bold",
    fontSize: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
});


