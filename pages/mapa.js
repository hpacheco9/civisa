import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Voltar from "../components/Voltar";
import { useNavigation } from "@react-navigation/native";
import backGround from "../services/background.js";
import { useLista } from "../hooks/useLista.jsx";
import LogoMap from "../components/logoMap.jsx";

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

const Mapa = () => {
  const [form, setForm] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigator = useNavigation();
  const { events } = useLista();
 

  useEffect(() => {
    const formattedEvents = events.map((event) => {
      const eventDate = event.Origin[0].originTime[0].split(" ")[0];
      const utcTime = event.Origin[0].originTime[0].split(" ")[1].slice(0, 8);
      const region =
        event.CommentCommand.find(
          (comment) => comment.$.Parameter === "REGIAO:"
        )?.value[0] || "Não especificada";
      const magnitude = parseFloat(event.Magnitude[0].value[0]);
      const intensidade =
        event.CommentCommand.find(
          (comment) => comment.$.Parameter === "SENTIDO:"
        )?.value[0]?.split(" -")[0] || "Não sentido";
      const regiao =
        event.CommentCommand.find(
          (comment) => comment.$.Parameter === "SENTIDO:"
        )?.value[0]?.split(" -")[1] || "Não especificada";
      const locationString = event.Origin[0].location[0]._;
      const locationParts = locationString.split(",");
      const latitude = locationParts[0].trim();
      const longitude = locationParts[1].trim();

      return {
        eventDate,
        utcTime,
        region,
        magnitude,
        intensidade,
        regiao,
        latitude,
        longitude,
      };
    });

    const sortedEvents = formattedEvents.sort((a, b) => {
      const dateA = new Date(`${a.eventDate}T${a.utcTime}`);
      const dateB = new Date(`${b.eventDate}T${b.utcTime}`);
      return dateB - dateA;
    });

    setForm(sortedEvents);
    setFilteredEvents(sortedEvents);
  }, [events]);

  const filterUniqueEvents = (eventsArray) => {
    eventsArray.sort((a, b) => {
      const dateA = new Date(a.Origin[0].originTime[0]);
      const dateB = new Date(b.Origin[0].originTime[0]);
      return dateB - dateA;
    });

    const uniqueEventIds = new Set();
    const uniqueEvents = [];

    eventsArray.forEach((event) => {
      const eventId = event.$.EventID;
      if (!uniqueEventIds.has(eventId)) {
        uniqueEventIds.add(eventId);
        uniqueEvents.push(event);
      }
    });

    return uniqueEvents;
  };

  const toggleEventDetails = useCallback(
    (eventIndex) => {
      const event = filteredEvents[eventIndex];
      navigator.navigate("Sismo", {
        latitude: event.latitude,
        longitude: event.longitude,
        region: event.region,
        date: event.eventDate,
        time: event.utcTime,
        intensidade: event.intensidade,
        mag: event.magnitude,
        regiao: event.regiao,
        backGround: backGround(event.intensidade?.trim()),
      });
    },
    [filteredEvents, navigator]
  );

  const getMarkerIcon = (event, index) => {
    const eventDate = new Date(`${event.eventDate}T${event.utcTime}`);
    const currentDate = new Date();
    const timeDifference = (currentDate - eventDate) / (1000 * 60 * 60 * 24);

    if (index === 0) {
      return require("../assets/map_marker.png");
    }

    if (event.intensidade !== "Não sentido") {
      return require("../assets/icon_yellow_f.png");
    }

    if (timeDifference <= 1) {
      return require("../assets/icon_red.png");
    }

    if (timeDifference <= 5) {
      return require("../assets/icon_orange.png");
    }

    return require("../assets/icon_yellow.png");
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={undefined}
        style={styles.map}
        region={{
          latitude: 38,
          longitude: -28.2,
          latitudeDelta: 9,
          longitudeDelta: 9,
        }}
        mapType="hybrid"
        showsCompass={false}
        rotateEnabled={false}
        toolbarEnabled={false}
      >
        {filteredEvents.map((event, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(event.latitude),
              longitude: parseFloat(event.longitude),
            }}
            image={getMarkerIcon(event, index)}
            onPress={(e) => toggleEventDetails(index)}
          />
        ))}
      </MapView>
      <Voltar iswhite={true} />
      <LogoMap/>
      <OverlayComponent style={styles.overlayComponent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  map: {
    flex: 1,
  },
  voltar: {
    position: "absolute",
    top: "7%",
    left: "7%",
    zIndex: 1,
  },
  voltarText: {
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
    color: "#FFFFFF",
  },
  overlay: {
    marginTop: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    alignItems: "left",
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

export default Mapa;
