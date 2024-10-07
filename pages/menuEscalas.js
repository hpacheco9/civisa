import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";
import TopBar from "../components/topBar.jsx";

const { height } = Dimensions.get("window");

const MenuEscala = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar />
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
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 7,
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
    height: "22%",
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
