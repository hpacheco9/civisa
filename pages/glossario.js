import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Voltar from "../components/Voltar.jsx";

const Glossario = () => {
  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Glossario</Text> */}
        <Text style={styles.textoBold}>Epicentro</Text>
        <Text style={styles.texto}>
          Ponto à superfície da Terra, localizado na vertical do hipocentro.
        </Text>
        <Text style={styles.textoBold}>
          Escala Macrossísmica Europeia (EMS-98)
        </Text>
        <Text style={styles.texto}>
          Escala qualitativa resultante de revisões de muitas escalas de
          intensidade utilizadas, tendo em conta as diferentes técnicas de
          construção de edifícios. A primeira versão foi publicada em 1992, e
          foi posteriormente revista por Grünthal em 1998.
        </Text>
        <Text style={styles.textoBold}>Escala de magnitudes</Text>
        <Text style={styles.texto}>
          Escala que mede a quantidade de energia libertada de um sismo com base
          em observações recolhidas através de equipamento sísmico. É uma escala
          aberta pois não tem mínimo nem máximo. Existem muitas escalas de
          magnitude, sendo a mais conhecida a Escala de Richter.
        </Text>
        <Text style={styles.textoBold}>
          Escala de Mercalli Modificada (MM-56)
        </Text>
        <Text style={styles.texto}>
          Escala qualitativa usada para classificar a intensidade de um sismo a
          partir dos seus efeitos em pessoas e estruturas na superfície da
          Terra. A Escala de Mercalli foi desenvolvida por Giuseppe Mercalli em
          1902, sendo posteriormente sujeita a aperfeiçoamentos por vários
          autores. A última revisão foi efetuada em 1956 por Richter.
        </Text>
        <Text style={styles.textoBold}>Escala de Richter</Text>
        <Text style={styles.texto}>
          Escala numérica logarítmica que mede a energia libertada por um sismo,
          através da medição da amplitude das ondas sísmicas. Foi desenvolvida
          por Richter e Gutenberg em 1935.
        </Text>
        <Text style={styles.textoBold}>Hipocentro</Text>
        <Text style={styles.texto}>
          Ponto no interior da Terra onde se inicia o processo de rotura
          sísmica, a partir do qual se propagam as ondas sísmicas.
        </Text>
        <Text style={styles.textoBold}>Intensidade sísmica</Text>
        <Text style={styles.texto}>
          Medida qualitativa da severidade da vibração do solo provocada pela
          passagem das ondas sísmicas numa determinada área, com base nos
          efeitos observados em pessoas, objetos, estruturas e elementos
          naturais, tal como eles são testemunhados pelas pessoas.
        </Text>
        <Text style={styles.textoBold}>Magnitude sísmica</Text>
        <Text style={styles.texto}>
          Medida instrumental da grandeza de um sismo expressa pela quantidade
          de energia libertada durante a rotura sísmica. Para a quantificação da
          magnitude de um sismo podem ser utilizadas variadas escalas, sendo a
          mais vulgarmente utilizada a Escala de Richter.
        </Text>
        <Text style={styles.textoBold}>Onda sísmica</Text>
        <Text style={styles.texto}>
          Forma de propagação da energia libertada na fonte sísmica, através de
          meios sólidos e líquidos. É responsável pelo movimento vibratório do
          solo à superfície da crosta terrestre.
        </Text>
        <Text style={styles.textoBold}>Réplica</Text>
        <Text style={styles.texto}>
          Sismo de menor magnitude que se segue ao evento sísmico principal com
          origem na mesma fonte ou zona sismogénica. As réplicas ocorrem
          geralmente durante alguns dias ou meses, sendo comum o decréscimo da
          frequência e magnitude com o decorrer do tempo.
        </Text>
        <Text style={styles.textoBold}>Sismo</Text>
        <Text style={styles.texto}>
          Um sismo representa a rotura das rochas ao longo de novos planos de
          fraqueza ou de planos preexistentes, designados por falhas tectónicas.
          Desta rotura resulta a libertação súbita da energia sob a forma de
          ondas elásticas que provocam a vibração do solo à sua passagem. O
          local onde o sismo é gerado denomina-se foco ou hipocentro e pode
          situar-se a profundidades variáveis (desde a superfície terrestre até
          algumas centenas de quilómetros). O ponto à superfície, localizado
          diretamente acima do foco, designa-se por epicentro. Os termos tremor
          de terra ou terramoto são vulgarmente utilizados como sinónimos da
          palavra sismo.
        </Text>
        <Text style={styles.textoBold}>Sismo precursor</Text>
        <Text style={styles.texto}>
          Sismo que antecede o sismo principal de uma série.
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

export default Glossario;
