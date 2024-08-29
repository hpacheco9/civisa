import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Voltar from '../components/Voltar';

const { height } = Dimensions.get('window');

const Perfil = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: 'Not available',
    email: 'Not available',
    phone: 'Not available',
  });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const db = getFirestore();

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

  const deleteAccount = async (inputPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is currently signed in.');
      return;
    }

    try {
      const userString = await AsyncStorage.getItem('@user');
      if (!userString) {
        Alert.alert('Error', 'User data not found. Please sign in again.');
        return;
      }
      const userData = JSON.parse(userString);
      const { email } = userData;
      await signInWithEmailAndPassword(auth, email, inputPassword);
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, 'users', document.id));
      });

      await deleteUser(user);
      await AsyncStorage.removeItem('@user');

      Alert.alert('Success', 'Your account and associated data have been deleted.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to delete account:', error);
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setModalVisible(true),
        },
      ]
    );
  };

  const handleDelete = () => {
    if (password) {
      deleteAccount(password);
      setModalVisible(false);
    } else {
      Alert.alert('Error', 'Password cannot be empty.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#781f1c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Voltar />
      <Text style={styles.header}>Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.info}>{userData.name}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{userData.email}</Text>
        <Text style={styles.label}>Telemóvel</Text>
        <Text style={styles.info}>{userData.phone}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete Account"
          onPress={confirmDeleteAccount}
          color="#781f1c"
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={handleDelete}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: '20%',
  },
  label: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#781f1c',
    marginBottom: '3%',
  },
  info: {
    fontSize: height * 0.02,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: '#888',
    marginRight: 10,
  },
  buttonDelete: {
    backgroundColor: '#781f1c',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Perfil;
