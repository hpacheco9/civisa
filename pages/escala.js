import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import backGround from "../services/background.js";
import escala from "../services/escala.json";

const intensityData = escala.escala;

const Escala = () => {


  return (
    <ScrollView>
        <View style={styles.container}>
        <Text style={styles.title}>Escala Mercalli Modificada</Text>
        {intensityData.map((item, index) => (
          <View key={index} style={styles.containerValor}>
            <View
              style={[
                styles.magContainer,
                { backgroundColor: backGround(item.level) },
              ]}
            >
              <Text style={styles.magnitude}>{item.level}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textoBold}>{item.title}</Text>
              <Text style={styles.texto}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
      
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginTop: '34%',
    marginBottom: '25%'
  },
  containerValor: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,

  },
  magContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  magnitude: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Escala;
