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
import alerta from "../services/alertaRAA.json";
import TopBar from "../components/topBar.jsx";

const alertData = alerta.alerta;

const AlertaVulcanico = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar/>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Código de Alerta Vulcânico para a Região dos Açores (2023)
        </Text>
        {alertData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={[styles.containerValor, { backgroundColor: item.color }]}
              onPress={() => toggleExpand(index)}
            >
              <View style={styles.textContainer}>
                <Text style={styles.textoBold}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={expandedIndex !== index}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {
                      fontStyle: "italic",
                      color: "gray",
                      textAlign: "center",
                      marginHorizontal: "15%",
                    },
                  ]}
                >
                  {"\n" + item.description2 + "\n"}
                </Text>
                <Text style={styles.descriptionText}>{item.description3}</Text>
              </View>
            </Collapsible>
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
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  alertaContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  alerta: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
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
    color: "#000",
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

export default AlertaVulcanico;
