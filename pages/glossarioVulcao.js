import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";
import glossario from "../services/glossarioVulcao.json";
import Voltar from "../components/Voltar.jsx";
const glossarioData = glossario.glossario;

const GlossarioVulcao = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        <Text style={styles.title}>Glossário Vulcanologia</Text>
        {glossarioData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.containerValor}
              onPress={() => toggleExpand(index)}
            >
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
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#781f1c",
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
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
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

export default GlossarioVulcao;
