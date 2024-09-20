import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import Collapsible from "react-native-collapsible";
import glossario from "../services/glossarioVulcao.json";
import Voltar from "../components/Voltar.jsx";

const glossarioData = glossario.glossario;
const { height, width } = Dimensions.get('window');

const GlossarioVulcao = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Voltar />
      <Text style={styles.title}>Glossário Vulcanologia</Text>
      <View style={{ backgroundColor: "#ffffff", height: height * 0.02 }}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {glossarioData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.containerValor}
                onPress={() => toggleExpand(index)}
              >
                <Text style={styles.textoBold}>{item.title}</Text>
              </TouchableOpacity>
              <Collapsible collapsed={expandedIndex !== index}>
                <View style={styles.descriptionContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  <Text style={styles.descriptionText}>{item.description}</Text>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: "5%",
  },
  itemContainer: {
    marginBottom: 10,
  },
  containerValor: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#781f1c",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginTop: "20%",
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  descriptionContainer: {
    flexDirection: "column", // Ensures image and text are stacked
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
    marginTop: 10, // Adds spacing between the image and text
  },
  image: {
    width: "100%", // Image takes full width
    height: 200, // Adjust height as needed
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default GlossarioVulcao;