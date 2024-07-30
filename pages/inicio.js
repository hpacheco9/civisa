import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get("window");

const Inicio = () => {
  const navigator = useNavigation();

 async function clear () {
    await AsyncStorage.multiRemove([
      '@contactInfo',
      '@locationInfo',
      '@formAnswers',
      '@selectedDateTime',
      'observations'
    ]);

  }
  clear();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require("../assets/CIVISA_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("RGPD")}
        >
          <Iconify
            icon="material-symbols:list-alt-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Sentiu um sismo?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Lista")}
        >
          <Iconify
            icon="material-symbols:event-list-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Mapa")}
        >
          <Iconify
            icon="material-symbols:globe"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Alertas")}
        >
          <Iconify
            icon="material-symbols:volcano-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Alertas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("MenuAjuda")}
        >
          <Iconify
            icon="material-symbols:question-mark-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Informações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerLogo: {
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: 40,
    backgroundColor: "#FFF",
  },
  logo: {
    width: "80%",
    height: 40,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
    height: "30%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#781f1c",
    borderRadius: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: height * 0.02,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Inicio;
