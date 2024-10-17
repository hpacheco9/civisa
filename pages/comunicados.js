import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Voltar from "../components/Voltar.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const MAX_COMUNICADOS = 10;
import TopBar from "../components/topBar";

const Comunicados = () => {
  const [comunicados, setComunicados] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredComunicados(); // Load stored comunicados on component mount
    fetchData();
  }, []);

  const loadStoredComunicados = async () => {
    try {
      const storedComunicados = await AsyncStorage.getItem("comunicados");
      if (storedComunicados) {
        setComunicados(JSON.parse(storedComunicados));
      }
    } catch (error) {
      console.error("Error loading stored comunicados", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://www.ivar.azores.gov.pt/seismic/comunicado.txt");
      const text = await response.text();
      const jsonData = JSON.parse(text);
      const newComunicados = Array.isArray(jsonData) ? jsonData : [jsonData];

      setComunicados((prevComunicados) => {
        // Combine and remove duplicates, but allow same date with different times
        const combinedComunicados = [
          ...prevComunicados,
          ...newComunicados.filter((newComunicado) =>
            !prevComunicados.some((comunicado) => isSameDateAndTime(comunicado, newComunicado))
          ),
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (newest first)
          .slice(0, MAX_COMUNICADOS); // Keep only the most recent 10

        // Save to AsyncStorage
        storeComunicados(combinedComunicados);

        return combinedComunicados;
      });

      setLoading(false);
    } catch (error) {
      console.error("Não foi possível carregar comunicados", error);
      setLoading(false);
    }
  };

  const isSameDateAndTime = (comunicadoA, comunicadoB) => {
    const dateA = new Date(comunicadoA.date).getTime();
    const dateB = new Date(comunicadoB.date).getTime();
    return dateA === dateB;
  };

  const storeComunicados = async (comunicados) => {
    try {
      await AsyncStorage.setItem("comunicados", JSON.stringify(comunicados));
    } catch (error) {
      console.error("Error storing comunicados", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar/>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Comunicados</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : comunicados.length > 0 ? (
          comunicados.map((comunicado, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.containerValor}
                onPress={() => toggleExpand(index)}
              >
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{comunicado.date}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textoBold}>{comunicado.title}</Text>
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={expandedId !== index}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>{comunicado.text}</Text>
                </View>
              </Collapsible>
            </View>
          ))
        ) : (
          <Text>Sem Comunicados</Text>
        )}
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
    marginLeft: "5%",
    width: "90%",
  },
});

export default Comunicados;
