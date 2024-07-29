import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";
import Voltar from "../components/Voltar";

const MenuAjuda = () => {
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
          onPress={() => navigator.navigate("Ajuda")}
        >
          <Iconify
            icon="material-symbols:exclamation-rounded"
            size={70}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Informações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Glossario")}
        >
          <Iconify
            icon="material-symbols:format-list-bulleted-rounded"
            size={70}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Glossário</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("MenuEscala")}
        >
          <Iconify
            icon="material-symbols:earthquake-rounded"
            size={70}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Escalas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("QuemSomos")}
        >
          <Iconify
            icon="material-symbols:question-mark-rounded"
            size={70}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Quem somos?</Text>
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
    paddingBottom: 60,
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
    width: "48%",
    height: "30%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#781f1c",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MenuAjuda;
