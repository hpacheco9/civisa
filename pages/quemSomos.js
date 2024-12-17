import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Collapsible from "react-native-collapsible";
import info from "../services/info.json";
import TopBar from "../components/topBar.jsx";

const infoData = info.info;

const QuemSomos = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  const renderQuestionText = (text) => {
    const parts = text.split(/(_)/);
    let isBold = false;
    return parts.map((part, index) => {
      if (part === "_") {
        isBold = !isBold;
        return null;
      }
      return (
        <Text
          key={index}
          style={isBold ? { fontWeight: "bold" } : {}}
        >
          {part}
        </Text>
      );
    });
  };

  return (
    <>
      <TopBar />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Informações</Text>
          <View style={styles.container}>
            {infoData.map((item, index) => (
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
                    <Text style={styles.descriptionText}>
                      {renderQuestionText(item.description)}
                    </Text>
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
    paddingBottom: 20,
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
    textAlign: "justify",
  },
});

export default QuemSomos;
