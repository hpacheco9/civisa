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
  const [comunicados, setComunicados] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://www.ivar.azores.gov.pt/seismic/comunicado.txt");
      const text = await response.text();
      const jsonData = JSON.parse(text);

      // Assuming jsonData is an array of comunicados
      // If it's a single object, wrap it in an array: [jsonData]
      const newComunicados = Array.isArray(jsonData) ? jsonData : [jsonData];

      setComunicados(prevComunicados => {
        // Combine new and existing comunicados
        const allComunicados = [...newComunicados, ...prevComunicados];
        
        // Sort by date (assuming each comunicado has a 'date' field)
        const sortedComunicados = allComunicados.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );

        return sortedComunicados.slice(0, 10);
      });

      setLoading(false);
    } catch (error) {
      console.log("Não foi possível carregar comunicados", error);
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView>
      <Voltar />
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