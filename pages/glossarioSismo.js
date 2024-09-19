import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Collapsible from "react-native-collapsible";
import glossario from "../services/glossarioSismo.json";
import Voltar from "../components/Voltar.jsx";
const glossarioData = glossario.glossario;

const GlossarioSismo = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
    <Voltar />
    <View style={{backgroundColor: '#ffffff', height: height * 0.15}}></View>
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Glossário Sismologia</Text>
        {glossarioData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
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
    </>
    
  );
};
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    padding: 16,
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  itemContainer: {
    marginBottom: 10,
  },
  containerValor: {
    flexDirection: "row",
    alignItems: "center",
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
    textAlign: "center",
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
    borderWidth: 1,
    borderTopWidth: 0,
  },
  descriptionText: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
  },
});

export default GlossarioSismo;