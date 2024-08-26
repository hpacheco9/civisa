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
import Voltar from "../components/Voltar";

const { height } = Dimensions.get("window");

const MenuEscala = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Voltar />
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
          onPress={() => navigator.navigate("Escala")}
        >
          <Iconify
            icon="material-symbols:earthquake-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Mercalli Modificada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Macrossismica")}
        >
          <Iconify
            icon="material-symbols:earthquake-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Macrossísmica Europeia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("AlertaVulcanico")}
        >
          <Iconify
            icon="material-symbols:volcano-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Alerta Vulcânico Açores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("AlertaAviacao")}
        >
          <Iconify
            icon="material-symbols:volcano-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Alerta Vulcânico Aviação</Text>
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
    paddingTop: "40%",
    paddingBottom: 40,
    backgroundColor: "#FFF",
  },
  logo: {
    width: "85%",
    height: 40,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 7,
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
    height: "30%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#781f1c",
    borderRadius: 30,
    marginVertical: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: height * 0.02,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MenuEscala;
