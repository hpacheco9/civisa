import { View, Text, Image, StyleSheet } from "react-native";

const OverlayComponent = (props) => (
  <View style={[styles.overlay, props.style]}>
    <Text style={styles.overlayTitleText}>Legenda</Text>
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: "3%" }}
    >
      <Image
        source={require("../assets/icon_red.png")}
        style={{ width: 15, height: 15, marginRight: "3%" }}
      />
      <Text style={styles.overlayText}>Eventos das últimas 24 horas</Text>
    </View>
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: "3%" }}
    >
      <Image
        source={require("../assets/icon_orange.png")}
        style={{ width: 15, height: 15, marginRight: "3%" }}
      />
      <Text style={styles.overlayText}>Eventos com 1 a 5 dias</Text>
    </View>
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: "3%" }}
    >
      <Image
        source={require("../assets/icon_yellow.png")}
        style={{ width: 15, height: 15, marginRight: "3%" }}
      />
      <Text style={styles.overlayText}>Eventos com mais de 5 dias</Text>
    </View>
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: "3%" }}
    >
      <Image
        source={require("../assets/icon_yellow_f.png")}
        style={{ width: 15, height: 15, marginRight: "3%" }}
      />
      <Text style={styles.overlayText}>Evento sentido</Text>
    </View>
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: "3%" }}
    >
      <Image
        source={require("../assets/map_marker.png")}
        style={{ width: 15, height: 15, marginRight: "3%" }}
      />
      <Text style={styles.overlayText}>Último evento</Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  overlay: {
    marginTop: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    alignItems: "flex-start",
  },
  overlayTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  overlayText: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#FFFFFF",
  },
  overlayComponent: {
    position: "absolute",
    top: "7%",
    right: "3%",
    left: "45%",
    padding: 10,
    borderRadius: 10,
  },
});

export default OverlayComponent;
