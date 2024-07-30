import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import InfoContainer from "../components/infoContainer";
import Voltar from "../components/Voltar";

const ListaEventos = () => {
  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Eventos</Text>
        <Text style={styles.texto}>
          Nesta secção são apresentados os eventos dos últimos 60 dias ou os
          últimos 100 eventos. Ao carregar numa das linhas, a página com
          informação detalhada do evento é mostrada. Abaixo está uma breve
          descrição sobre a informação apresentada na lista de eventos.
        </Text>
        <InfoContainer
          date={"Linha A"}
          time={"Linha A"}
          region={"Linha B"}
          intensidade={"Linha C"}
          mag={"D"}
          bg={"#7EF895"}
        />
        <Text style={styles.textoBold}>Linha A:</Text>
        <Text style={styles.texto}>
          Data e hora UTC (Tempo Universal Coordenado)
        </Text>
        <Text style={styles.textoBold}>Linha B:</Text>
        <Text style={styles.texto}>Região do evento</Text>
        <Text style={styles.textoBold}>Linha C:</Text>
        <Text style={styles.texto}>Valor da Intensidade</Text>
        <Text style={styles.textoBold}>Caixa D:</Text>
        <Text style={styles.texto}>
          Magnitude local. A cor de fundo indica a intensidade na Escala de
          Mercalli Modificada.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
    marginTop: "36%",
    overflow: "scroll",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: "5%",
  },
  texto: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: "5%",
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ListaEventos;
