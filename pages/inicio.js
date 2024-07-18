import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Inicio = () => {
  const navigator = useNavigation();

  // Navigation handler with debounce to prevent rapid navigation actions
  const navigateToScreen = React.useCallback(
    (screenName) => {
      navigator.navigate(screenName);
    },
    [navigator]
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.containerLogo}>
        <Image
          source={require("../assets/CIVISA_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen("RGPD")}
        >
          <Image
            source={require("../assets/inquerito.jpg")}
            style={styles.buttonImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <Text style={styles.buttonText}>Sentiu um sismo?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen("Lista")}
        >
          <Image
            source={require("../assets/vulcao.jpg")}
            style={styles.buttonImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <Text style={styles.buttonText}>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen("Mapa")}
        >
          <Image
            source={require("../assets/planeta.jpg")}
            style={styles.buttonImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <Text style={styles.buttonText}>Mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  containerLogo: {
    alignItems: "center",
    paddingTop: "20%",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: "100%",
    height: 40,
  },
  container: {
    paddingTop: "10%",
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },
  button: {
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  buttonText: {
    position: "absolute",
    left: "5%",
    top: "5%",
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Inicio;
