import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Voltar from "../components/Voltar.jsx";

const QuemSomos = () => {
  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Quem somos?</Text> */}
        <Text style={styles.textoBold}>
          O Instituto de Vulcanologia e Avaliação de Riscos Geológicos (IVAR)
        </Text>
        <Text style={styles.texto}>
          É uma unidade orgânica de investigação da Universidade dos Açores
          dotada de autonomia administrativa e científica. Integra o Sistema
          Científico e Tecnológico Nacional, tendo sido classificado com
          Excelente no último processo de avaliação internacional, e é membro do
          World Organization Volcano Observatories.
        </Text>
        <Text style={styles.textoBold}>
          O Centro de Informação e Vigilância Sismovulcânica dos Açores (CIVISA)
        </Text>
        <Text style={styles.texto}>
          É uma associação privada sem fins lucrativos, constituída pela
          Universidade dos Açores e pela Região Autónoma dos Açores. Trata-se da
          estrutura que garante a monitorização sismovulcânica permanente da
          região dos Açores e a assessoria técnico-científica às autoridades de
          proteção civl.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginTop: "34%",
    marginBottom: "25%",
  },
  containerValor: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  magContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  magnitude: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
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
  texto: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuemSomos;
