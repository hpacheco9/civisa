import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";
import alerta from "../services/alertaRAA.json";
import Voltar from "../components/Voltar.jsx";
const alertData = alerta.alerta;

const AlertaVulcanico = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.scrollView} removeClippedSubviews={false}>
      <Voltar/>
      <View style={styles.container}>
        <Text style={styles.title}>
          Código de Alerta Vulcânico para a Região dos Açores (2023)
        </Text>
        {alertData.map((item, index) => (
          <View key={index} style={styles.alertItem}>
            <TouchableOpacity
              style={[styles.containerValor, { backgroundColor: item.color }]}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
            >
              <View style={styles.alertaContainer}>
                <Text style={styles.alerta}>{item.level}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textoBold}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={expandedIndex !== index}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </Collapsible>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    padding: 16,
    paddingTop: "34%", // Adjust based on your needs
    paddingBottom: "5%",
  },
  alertItem: {
    marginBottom: 10,
  },
  containerValor: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
    color: "#000",
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
    flexDirection: "column", 
    backgroundColor: "#f6f6f6",
    padding: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    borderTopWidth: 0,
  },
  descriptionText: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
    textAlign: "justify",
    marginTop: 10, 
  },
});

export default AlertaVulcanico;
