import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Inicio = () => {
  const navigator = useNavigation();
  return (
    <ScrollView>
      <View style={styles.containerLogo}>
        <Image
          source={require("../assets/CIVISA_logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("RGPD")}
        >
          <Image
            source={require("../assets/inquerito.jpg")}
            style={styles.buttonImage}
          />
          <View style={styles.overlay} />
          <Text style={styles.buttonText}>Sentiu um sismo?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Lista")}
        >
          <Image
            source={require("../assets/vulcao.jpg")}
            style={styles.buttonImage}
          />
          <View style={styles.overlay} />
          <Text style={styles.buttonText}>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Mapa")}
        >
          <Image
            source={require("../assets/planeta.jpg")}
            style={styles.buttonImage}
          />
          <View style={styles.overlay} />
          <Text style={styles.buttonText}>Mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
    overflow: "scroll",
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20%",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: "100%",
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#c00000",
    marginBottom: 30,
    textAlign: "center",
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
    marginLeft: "5%",
    marginTop: "5%",
    textAlign: "left",
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Inicio;
