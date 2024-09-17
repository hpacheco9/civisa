import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import animation from '../sucess.json'


const Registado = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

 return (
  <View style={styles.container}>
  <LottieView
    autoPlay
    style={{
      width: 300,
      height:300
    }}
    loop={false}
    source={animation}
  />
  <Text style={{fontSize: 18}}>
    Registado com Sucesso! 
  </Text>
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});

export default Registado;
