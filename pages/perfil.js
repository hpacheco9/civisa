import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voltar from '../components/Voltar';

const { height } = Dimensions.get('window');

const Perfil = () => {
  const [userData, setUserData] = useState({
    name: 'Not available',
    email: 'Not available',
    phone: 'Not available',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem('@user');
        if (userString) {
          const user = JSON.parse(userString);
          setUserData({
            name: user.Name || 'Not available',
            email: user.email || 'Not available',
            phone: user.phone || 'Not available',
          });
        } else {
          console.warn('No user data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#781f1c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Voltar/>
      <Text style={styles.header}>Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.info}>{userData.name}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{userData.email}</Text>
        <Text style={styles.label}>Telemóvel</Text>
        <Text style={styles.info}>{userData.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: '5%',
  },
  header: {
    fontSize: height * 0.04,
    marginTop: '15%',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    marginTop: '20%'
  },
  label: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#781f1c',
    marginBottom: '3%'
  },
  info: {
    fontSize: height * 0.02,
    marginBottom: 15,
  },
});

export default Perfil;
