import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/topBar.jsx";

const Rgpd = () => {
  const navigator = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar />
      <ScrollView>
        <Text style={styles.title}>
          Proteção de Dados Pessoais e Recolha de Consentimento para o
          Tratamento dos Dados (RGPD)
        </Text>
        <View style={styles.container}>
          <Text style={styles.texto}>
            O CIVISA/IVAR é responsável pelo tratamento dos dados
            disponibilizados na aplicação móvel AZORES VOLQUAKE, incluindo os
            dados fornecidos pelos utilizadores através do seu registo na
            plataforma e/ou dos inquéritos de macrossísmica para reporte de
            ocorrências relacionadas com atividade sísmica. Tal informação tem
            como única finalidade a determinação da intensidade sísmica e poderá
            ser disponibilizada às autoridades de proteção civil. Os dados
            recolhidos não serão usados pelo CIVISA/IVAR para decisões
            automatizadas, nomeadamente no que respeita à definição de perfis.
            {"\n\n"}
            Os dados pessoais são recolhidos de acordo com o tipo de acesso,
            nomeadamente:{"\n"}
            a) Como utilizador registado - São requeridos os seguintes dados
            pessoais uma única vez: nome, endereço de correio eletrónico, número
            de contacto telefónico e palavra-passe. O registo de utilizador na
            APP permite a importação dos dados do utilizador para o inquérito de
            macrossísmica e a receção de notificações.
            {"\n"}
            b) Como convidado - São requeridos os seguintes dados pessoais
            sempre que é preenchido um inquérito de macrossísmica: nome,
            endereço de correio eletrónico e número de contacto telefónico.
            {"\n\n"}O fornecimento de dados pelo titular autoriza o CIVISA/IVAR
            a entrar em contacto com o mesmo através do número de telefone
            disponibilizado, caso seja necessário recolher alguma informação
            adicional sobre o impacto da ocorrência reportada.
            {"\n\n"}
            Os dados pessoais serão conservados permanentemente desde o momento
            em que forem facultados, podendo ser eliminados a qualquer momento
            mediante pedido enviado ao Responsável pela Proteção de Dados do
            CIVISA (carlos.ms.primo@azores.gov.pt).
          </Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    marginBottom: "5%",
  },
  texto: {
    fontSize: 18,
    textAlign: "justify",
  },
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "5%",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Rgpd;
