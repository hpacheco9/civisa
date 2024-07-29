import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";

const SuccessScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Inicio");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/v2.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.thankYouText}>Obrigado pela sua colaboração</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  animation: {
    width: 200,
    height: 200,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});

export default SuccessScreen;
