import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SplashScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const isLoggedOut = await AsyncStorage.getItem("@loggedOut");
        if (isLoggedOut === "true") {
          navigation.replace("Login");
          return;
        } else {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              navigation.replace("Inicio");
              return;
            } else {
              navigation.replace("Login");
              return;
            }
          });
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        navigation.replace("Login"); // Fallback to Login in case of any error
      }
    };

    checkUserStatus();
  }, [auth, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
