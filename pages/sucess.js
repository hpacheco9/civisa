import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import submitted from '../assets/teste.gif'

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
      <Image
        style={{height: 100, width: 100}}
        source={submitted}
        resizeMode="contain"
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});

export default SuccessScreen;
