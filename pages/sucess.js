import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import animation from '../sucess.json'
import LottieView from "lottie-react-native";

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
          autoPlay
          style={{
            width: 300,
            height:300
          }}
          loop={false}
          source={animation}
        />
        <Text style={{fontSize: 18}}>
          Obrigado pela sua colaboração. 
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

export default SuccessScreen;
