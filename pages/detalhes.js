import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoContainer from "../components/infoContainer";

const Detalhes = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Detalhes</Text>
    <Text style={styles.description}>
      Nesta secção é mostrado o mapa com os últimos 100 eventos ou com os
      eventos dos últimos 60 dias. Ao carregar num dos círculos, a página de
      detalhe é mostrada. O tamanho do círculo indica a magnitude do evento. O
      código de cores tem a seguinte correspondência:
    </Text>
    <InfoContainer
      date={"Linha A"}
      time={"Linha A"}
      region={"Linha B"}
      intensidade={"Linha E"}
      mag={"C"}
      bg={"#88DCDC"}
      longitude={"Linha Dº"}
      latitude={"Linha Dº"}
      cords={true}
      regiao={"Local"}
    ></InfoContainer>
    <Text style={styles.textoBold}>Linha A:</Text>
    <Text style={styles.texto}>
      Data e hora UTC (Tempo Universal Coordenado)
    </Text>
    <Text style={styles.textoBold}>Linha B:</Text>
    <Text style={styles.texto}>Região do evento</Text>
    <Text style={styles.textoBold}>Linha D:</Text>
    <Text style={styles.texto}>Coordenadas do Evento</Text>
    <Text style={styles.textoBold}>Linha E:</Text>
    <Text style={styles.texto}>Intensidadedo Evento</Text>
    <Text style={styles.textoBold}>Caixa C:</Text>
    <Text style={styles.texto}>
      Magnitude local. A cor de fundo indica a intensidade de Mercalli
      modificada (Deslizar para a última pagina)
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "34%",
    marginLeft: "2%",
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: "10%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: "7%",
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: "5%",
  },
  texto: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: "2%",
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Detalhes;
