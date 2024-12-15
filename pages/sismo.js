import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Voltar from '../components/Voltar.jsx';
import LogoMap from '../components/logoMap.jsx';
import InfoContainer from '../components/infoContainer.jsx';

const Sismo = ({ route }) => {
  const [loading, setLoading] = useState(true);
  
  // Extract parameters from route
  const {
    latitude,
    longitude,
    region,
    date,
    time,
    intensidade,
    mag,
    regiao,
    backGround,
    color = "#FF0000",
    title = "Event Location",
    description = "Earthquake Details"
  } = route.params;

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
            center: [${longitude}, ${latitude}],
            zoom: 11
          });

          const graphic = new Graphic({
            geometry: {
              type: "point",
              longitude: ${longitude},
              latitude: ${latitude}
            },
            symbol: {
              type: "simple-marker",
              color: "${color}",
              size: 12,
              outline: {
                color: "black",
                width: 1
              }
            },
            popupTemplate: {
              title: "${title}",
              content: "${description}"
            }
          });

          view.graphics.add(graphic);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: arcGISMapHtml }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={() => setLoading(false)}
      />
      
      {loading && (
        <ActivityIndicator 
          size={50} 
          color="#0000ff" 
          style={styles.loader} 
        />
      )}
  
      <Voltar 
        style={styles.voltar} 
        iswhite={true} 
      />

      <View style={styles.infoContainerWrapper}>
        <InfoContainer
          date={date}
          time={time}
          region={region}
          mag={mag}
          intensidade={intensidade}
          regiao={regiao}
          bg={backGround}
          latitude={latitude}
          longitude={longitude}
          cords={true}
          iswhite={true}
          height={130}
        />
      </View>
    
      <LogoMap style={styles.logoMap} />
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
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 10
  },
  voltar: {
    position: "absolute",
    top: "7%",
    left: "7%",
    zIndex: 11,
  },
  infoContainerWrapper: {
    position: "absolute",
    top: "17%",
    right: "3%",
    left: "3%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
  },
  logoMap: {
    position: "absolute",
    bottom: "3%",
    right: "3%",
    zIndex: 11,
  }
});

export default Sismo;