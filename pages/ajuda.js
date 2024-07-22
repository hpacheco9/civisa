import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Voltar from "../components/Voltar";
import Azoresquake from "./azoresquake";
import Detalhes from "./detalhes";
import ListaEventos from "./listaEventos";
import MapaEventos from "./mapaEventos";
import Escala from "./escala";
import { ScrollView } from "react-native-gesture-handler";

function Index() {
  const { width, height } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <>
      <View style={styles.voltarContainer}>
        <Voltar />
      </View>
      <View style={styles.container}>
        <Carousel
          loop
          width={width}
          height={height}
          autoPlay={false}
          data={[0, 1, 2, 3, 4]}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ index }) => (
            <View style={styles.slide}>
              {index === 0 && <Azoresquake />}
              {index === 1 && (
                <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <ListaEventos />
                </ScrollView>
              )}
              {index === 2 && <MapaEventos />}
              {index === 3 && (
                <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <Detalhes />
                </ScrollView>
              )}
              {index === 4 && (
                <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <Escala />
                </ScrollView>
              )}
            </View>
          )}
        />
        <View style={styles.pagination}>
          {[0, 1, 2, 3, 4].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === currentIndex ? "#000" : "#888" },
              ]}
            />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fFfFff",
    height: "100%",
  },
  slide: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0)",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    paddingBottom: 5,
  },
  voltarContainer: {
    position: "absolute",
    top: "8%",
    left: 20,
    zIndex: 1,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default Index;
