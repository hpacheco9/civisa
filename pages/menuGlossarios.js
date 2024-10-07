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
import TopBar from "../components/topBar";

const { height } = Dimensions.get("window");

const MenuGlossarios = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("GlossarioSismo")}
        >
          <Iconify
            icon="material-symbols:earthquake-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Sismologia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("GlossarioVulcao")}
        >
          <Iconify
            icon="material-symbols:volcano-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Vulcanologia</Text>
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

export default MenuGlossarios;
