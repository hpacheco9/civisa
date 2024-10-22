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
import TopBar from "../components/topBar";

const Alerta = () => {
  const [alertData, setAlertData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://www.ivar.azores.gov.pt/seismic/alarmzones.html")
      .then((response) => response.json())
      .then((data) => {
        const volcanicAlert = data.find((alert) => alert.Type === "Volcanic");
        if (volcanicAlert && volcanicAlert.Markers) {
          const sortedMarkers = volcanicAlert.Markers.sort(
            (a, b) => getLevelValue(b.Level) - getLevelValue(a.Level)
          );
          setAlertData(sortedMarkers);
        } else {
          setAlertData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching alert data:", error);
        setLoading(false);
      });
  }, []);

  const getLevelValue = (level) => {
    const levelMap = {
      V0: 0,
      V1: 1,
      V2: 2,
      V3: 3,
      V4: 4,
      V5: 5,
      V6: 6,
      V7: 7
    };
    return levelMap[level] || -1;
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar/>
    <ScrollView>
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
    </SafeAreaView>
  );
};

const getColor = (level) => {
  switch (level) {
    case "V0":
      return "#daf2d0";
    case "V1":
      return "#ffffcd";
    case "V2":
      return "#ffff00";
    case "V3":
      return "#ffcc99";
    case "V4":
      return "#ffc000";
    case "V5":
      return "#ff0000";
    case "V6":
      return "#c00000";
    case "V7":
      return "#a50021";
    default:
      return "#FFF";
  }
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

export default Alerta;