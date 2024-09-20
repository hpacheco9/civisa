import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Voltar from "../components/Voltar.jsx";

const Comunicados = () => {
  const [comunicadoData, setComunicadoData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://www.ivar.azores.gov.pt/seismic/comunicado.txt")
      .then((response) => response.text())
      .then((text) => {
        const data = JSON.parse(text);
        setComunicadoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comunicado data:", error);
        setLoading(false);
      });
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        <Text style={styles.title}>Comunicados</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : comunicadoData ? (
          <View>
            <TouchableOpacity
              style={styles.containerValor}
              onPress={toggleExpand}
            >
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{comunicadoData.date}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textoBold}>{comunicadoData.title}</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={!expanded}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{comunicadoData.text}</Text>
              </View>
            </Collapsible>
          </View>
        ) : (
          <Text>Sem Comunicados</Text>
        )}
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
    flexDirection: "column",
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#781f1c",
  },
  dateContainer: {
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#fff",
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
    color: "#fff",
  },
  descriptionContainer: {
    backgroundColor: "#f6f6f6",
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderTopWidth: 0,
    minHeight: 60,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "justify",
  },
});

export default Comunicados;