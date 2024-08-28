import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";
import escala from "../services/macrossismica.json";
import Voltar from "../components/Voltar.jsx";

const escalaData = escala.escala;

const Macrossismica = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const lastButtons = [
    {
      level: "X",
      title: "Muito destrutivo",
      color: "#ff6600",
    },
    {
      level: "XI",
      title: "Devastador",
      color: "#e84d00",
    },
    {
      level: "XII",
      title: "Completamente devastador",
      color: "#ba3e00",
    },
  ];

  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        <Text style={styles.title}>Escala Macrossísmica Europeia (1998)</Text>
        {escalaData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={[styles.containerValor, { backgroundColor: item.color }]}
              onPress={() => toggleExpand(index)}
            >
              <View style={styles.escalaContainer}>
                <Text style={styles.escala}>{item.level}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textoBold}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={expandedIndex !== index}>
              <View style={styles.descriptionContainer}>
                <Text style={[styles.descriptionText, { fontWeight: "bold" }]}>
                  Efeitos nos seres humanos:
                </Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <Text style={[styles.descriptionText, { fontWeight: "bold" }]}>
                  Efeitos sobre os objectos e a natureza:
                </Text>
                <Text style={styles.descriptionText}>{item.description2}</Text>
              </View>
            </Collapsible>
          </View>
        ))}
        {lastButtons.map((button) => (
          <TouchableOpacity
            key={button.level}
            style={[styles.containerValor, { backgroundColor: button.color }]}
          >
            <View style={styles.escalaContainer}>
              <Text style={styles.escala}>{button.level}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textoBold}>{button.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    marginTop: "34%",
    marginBottom: "5%",
  },
  containerValor: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  escalaContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  escala: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "#f6f6f6",
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderTopWidth: 0,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "justify",
  },
});

export default Macrossismica;
