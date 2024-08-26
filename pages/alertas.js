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

const Alerta = () => {
  const [alertData, setAlertData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://www.ivar.azores.gov.pt/seismic/alarmzones.html")
      .then((response) => response.json())
      .then((data) => {
        const volcanicAlert = data.find((alert) => alert.Type === "Volcanic");
        setAlertData(volcanicAlert ? volcanicAlert.Markers : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching alert data:", error);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        <Text style={styles.title}>Alertas Vulcânicos</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          alertData.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.containerValor,
                  { backgroundColor: getColor(item.Level) },
                ]}
                onPress={() => toggleExpand(index)}
              >
                <View style={styles.alertaContainer}>
                  <Text style={styles.alerta}>{item.Level}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textoBold}>{item.Name}</Text>
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={expandedIndex !== index}>
                <View style={styles.descriptionContainer}>
            
                  <Text style={styles.descriptionText}>{item.Description}</Text>
                </View>
              </Collapsible>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const getColor = (level) => {
  switch (level) {
    case "0":
      return "#25381e";
    case "1":
      return "#2a2d02";
    case "2":
      return "#323200";
    case "3":
      return "#59370a";
    case "4":
      return "#653d00";
    case "5":
      return "#ed0000";
    case "6":
      return "#c00000";
    case "7":
      return "#a50021";
    default:
      return "#ffffff";
  }
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
    padding: 5,
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

export default Alerta;
