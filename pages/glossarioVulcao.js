import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Collapsible from "react-native-collapsible";
import glossario from "../services/glossarioVulcao.json";
import TopBar from "../components/topBar.jsx";

const glossarioData = glossario.glossario;

const GlossarioVulcao = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
    <TopBar />
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Glossário Vulcanologia</Text>
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
    </>
    
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollView: {
    flexGrow: 1,

  },
  container: {
    flex: 1,
    padding: 16,
 
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
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
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
  image: {
    width: "100%", 
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default GlossarioVulcao;