import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";
import escala from "../services/macrossismica.json";
import TopBar from "../components/topBar.jsx";

const escalaData = escala.escala;

const Macrossismica = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar/>
    <ScrollView>
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
            {index < 9 && (
              <Collapsible collapsed={expandedIndex !== index}>
                <View style={styles.descriptionContainer}>
                  <Text style={[styles.descriptionText, { fontWeight: "bold" }]}>
                    Efeitos nos seres humanos:
                  </Text>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                  <Text style={[styles.descriptionText, { fontWeight: "bold" }]}>
                    Efeitos sobre os objetos e a natureza:
                  </Text>
                  <Text style={styles.descriptionText}>{item.description2}</Text>
                  <Text style={[styles.descriptionText, { fontWeight: "bold" }]}>
                    Efeitos nas construções:
                  </Text>
                  <Text style={styles.descriptionText}>{item.description3}</Text>
                </View>
              </Collapsible>
            )}
            {index >= 9 && (
              <Collapsible collapsed={expandedIndex !== index}>
                <View style={styles.descriptionContainer}>
                  <Text style={[styles.descriptionText, { fontWeight: "bold" }]}>
                    Efeitos nas construções:
                  </Text>
                  <Text style={styles.descriptionText}>{item.description3}</Text>
                </View>
              </Collapsible>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    backgroundColor: "#FFF",
    padding: 16,
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
