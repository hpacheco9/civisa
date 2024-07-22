import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Voltar from "../components/Voltar";

const Rgpd = () => {
  const navigator = useNavigation();

  return (
    <>
      <View style={{ flexDirection: "row", marginTop: "20%" }}>
        <View style={{ marginBottom: "10%", marginLeft: "5%" }}>
          <Voltar />
        </View>
        <Text style={styles.title}>RGPD</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.containerTexto}>
          <ScrollView>
            <Text style={styles.texto}>
              Dados pessoais são informação relativa a uma pessoa viva,
              identificada ou identificável. Também constituem dados pessoais o
              conjunto de informações distintas que podem levar à identificação
              de uma determinada pessoa.{"\n"}
              Dados pessoais que tenham sido descaracterizados, codificados ou
              pseudonimizados, mas que possam ser utilizados para reidentificar
              uma pessoa, continuam a ser dados pessoais e são abrangidos pelo
              âmbito de aplicação do RGPD.{"\n"}
              Dados pessoais que tenham sido tornados anónimos de modo a que a
              pessoa não seja ou deixe de ser identificável deixam de ser
              considerados dados pessoais. Para que os dados sejam
              verdadeiramente anonimizados, a anonimização tem de ser
              irreversível.{"\n"}
              Dados pessoais que tenham sido tornados anónimos de modo a que a
              pessoa não seja ou deixe de ser identificável deixam de ser
              considerados dados pessoais. Para que os dados sejam
              verdadeiramente anonimizados, a anonimização tem de ser
              irreversível.{"\n"}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigator.navigate("Data e Hora");
            }}
          >
            <Text style={styles.buttonText}>Li e aceito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "35%",
  },
  containerTexto: {
    flex: 6,
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: "#ffffff",
    overflow: "scroll",
  },
  texto: {
    fontSize: 18,
    textAlign: "justify",
  },
  section: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: "#FFFFFF",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: "5%",
  },
});
export default Rgpd;
