import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useLista } from "../hooks/useLista.jsx";
import Voltar from "../components/Voltar.jsx";
import LogoMap from "../components/logoMap.jsx";
import OverlayComponent from "../components/overlay.jsx";


const Mapa = () => {
  const [loading, setLoading] = useState(true);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const { events } = useLista();

  useEffect(() => {
    if (!events || events.length === 0) {
      setFormattedEvents([]);
      setLoading(false);
      return;
    }

    const currentDate = new Date();

    const formattedEvents = events.map((event, index) => {
      const originTime = event.Origin[0].originTime[0];
      const [eventDate, utcTime] = originTime.split(" ");
      const eventDateTime = new Date(`${eventDate}T${utcTime}`);
      const timeDifference = (currentDate - eventDateTime) / (1000 * 60 * 60 * 24);

      const region =
        event.CommentCommand.find(
          (comment) => comment.$.Parameter === "REGIAO:"
        )?.value[0] || "Não especificada";

      const intensidade =
        event.CommentCommand.find(
          (comment) => comment.$.Parameter === "SENTIDO:"
        )?.value[0]?.split(" -")[0] || "Não sentido";

      const regiao =
        event.CommentCommand.find(
          (comment) => comment.$.Parameter === "SENTIDO:"
        )?.value[0]?.split(" -")[1] || "Não especificada";

      const locationString = event.Origin[0].location[0]._;
      const [latitude, longitude] = locationString
        .split(",")
        .map((coord) => parseFloat(coord.trim()));

      // Determine color based on logic
      let color;
      if (index === 0) {
        color = "green"; // Highlight the first event
      } else if (intensidade !== "Não sentido") {
        color = "pink"; // Special category
      } else if (timeDifference <= 1) {
        color = "red"; // Recent events
      } else if (timeDifference <= 5) {
        color = "orange"; // Moderate age events
      } else {
        color = "yellow"; // Older events
      }

      return {
        latitude,
        longitude,
        title: `Evento - ${region}`,
        description: `Data: ${eventDate}, Hora: ${utcTime}, Magnitude: ${event.Magnitude[0].value[0]}`,
        color,
      };
    });

    // Sort by most recent first
    const sortedEvents = formattedEvents.sort((a, b) => {
      const dateA = new Date(a.eventDate + "T" + a.utcTime);
      const dateB = new Date(b.eventDate + "T" + b.utcTime);
      return dateB - dateA;
    });

    setFormattedEvents(sortedEvents);
    setLoading(false);
  }, [events]);

  const arcGISMapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://js.arcgis.com/4.25/esri/themes/light/main.css" />
      <script src="https://js.arcgis.com/4.25/"></script>
      <style>
        html, body, #viewDiv {
          padding: 0;
          margin: 0;
          height: 100%;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div id="viewDiv"></div>
      <script>
        require([
          "esri/Map",
          "esri/views/MapView",
          "esri/Graphic"
        ], function(Map, MapView, Graphic) {
          const map = new Map({
            basemap: "hybrid"
          });

          const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-28.2, 38],
            zoom: 8
          });

          const points = ${JSON.stringify(formattedEvents)};

          points.forEach(point => {
            const graphic = new Graphic({
              geometry: {
                type: "point",
                longitude: point.longitude,
                latitude: point.latitude
              },
              symbol: {
                type: "simple-marker",
                color: point.color,
                size: 12, // Numeric value
                outline: {
                  color: "black",
                  width: 1
                }
              },
              popupTemplate: {
                title: point.title,
                content: point.description
              }
            });

            view.graphics.add(graphic);
          });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size={50} color="#0000ff" style={styles.loader} />
      )}
      <Voltar iswhite={true} />

      <WebView
        originWhitelist={["*"]}
        source={{ html: arcGISMapHtml }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={() => setLoading(false)}
      />
    
      <OverlayComponent style={styles.overlayComponent} />
      <LogoMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  webview: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjusted for size 50
  },
  overlay: {
    marginTop: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    alignItems: "flex-start", // Changed from "left" to "flex-start"
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
