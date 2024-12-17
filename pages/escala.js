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
import escala from "../services/escala.json";
import alvenaria from "../services/alvenaria.json";
import backGround from "../services/background.js";
import TopBar from "../components/topBar.jsx";

const escalaData = escala.escala;
const alvenariaData = alvenaria.alvenaria;

const Escala = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedIndex2, setExpandedIndex2] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleExpand2 = (index) => {
    setExpandedIndex2(expandedIndex2 === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Escala de Mercalli Modificada (1956)</Text>
          {escalaData.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.containerValor,
                  { backgroundColor: backGround(item.level) },
                ]}
                onPress={() => toggleExpand(index)}
              >
                <View style={styles.escalaContainer}>
                  <Text style={styles.escala}>{item.level}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textoBold}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              {index < 12 && (
                <Collapsible collapsed={expandedIndex !== index}>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                      {item.description}
                    </Text>
                  </View>
                </Collapsible>
              )}
            </View>
          ))}
        <View style={{alignItems: 'center', paddingVertical: 10}}>
          <Text style={{color: '#000'}}>__________</Text>
        </View>
        <Text style={styles.alvenariaTitle}>Classificação de alvenarias</Text>
        {alvenariaData.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.containerValor,
                  { backgroundColor: "#CCC" }
                ]}
                onPress={() => toggleExpand2(index)}
              >
                <View style={styles.alvenariaContainer}>
                  <Text style={styles.textoBold}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              {index < 12 && (
                <Collapsible collapsed={expandedIndex2 !== index}>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                      {item.description}
                    </Text>
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
  alvenariaContainer: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
  alvenariaTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
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

export default Escala;
