import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const T = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [form, setForm] = useState(null);
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedDateTime = await AsyncStorage.getItem('@selectedDateTime');
        const storedForm = await AsyncStorage.getItem('@formAnswers');
        const storedContacts = await AsyncStorage.getItem('@contacts');

        if (storedDateTime !== null) {
          setSelectedDateTime(JSON.parse(storedDateTime));
        }
        if (storedForm !== null) {
          setForm(JSON.parse(storedForm));
        }
        if (storedContacts !== null) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (e) {
        console.error('Failed to fetch the data from AsyncStorage', e);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
        <View style={styles.container}>
            {selectedDateTime ? (
                <View>
                <Text style={styles.text}>Selected Date: {selectedDateTime.date}</Text>
                <Text style={styles.text}>Selected Time: {selectedDateTime.time}</Text>
                </View>
            ) : (
                <Text style={styles.text}>No date and time selected</Text>
            )}
            {form ? (
                <View style={styles.formContainer}>
                <Text style={styles.text}>Form Answers:</Text>
                {Object.entries(form).map(([question, answer], index) => (
                    <View key={index} style={styles.answerContainer}>
                    <Text style={styles.question}>{question}</Text>
                    <Text style={styles.answer}>{answer}</Text>
                    </View>
                ))}
                </View>
            ) : (
                <Text style={styles.text}>No form answers</Text>
            )}
            {contacts ? (
                <View style={styles.formContainer}>
                <Text style={styles.text}>Contact Information:</Text>
                <Text style={styles.answer}>Name: {contacts.name}</Text>
                <Text style={styles.answer}>Phone: {contacts.phone}</Text>
                <Text style={styles.answer}>Email: {contacts.email}</Text>
                <Text style={styles.answer}>Concelho: {contacts.concelho}</Text>
                <Text style={styles.answer}>Freguesia: {contacts.freguesia}</Text>
                </View>
            ) : (
                <Text style={styles.text}>No contact information</Text>
            )}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 70,
    overflow: 'scroll'
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  formContainer: {
    marginTop: 20,
  },
  answerContainer: {
    marginBottom: 10,
  },
  question: {
    fontWeight: 'bold',
  },
  answer: {
    marginLeft: 10,
  },
});

export default T;
