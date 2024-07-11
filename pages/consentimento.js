import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';


const Rgpd = () => {
  const [isChecked, setChecked] = useState(false);
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RGPD</Text>
      <View style={styles.containerTexto}>
        <ScrollView>
          <Text style={styles.texto}>
            Dados pessoais são informação relativa a uma pessoa viva,
            identificada ou identificável.
            Também constituem dados pessoais o conjunto de informações distintas
            que podem levar à identificação de uma determinada pessoa.{'\n'}

            Dados pessoais que tenham sido descaracterizados,
            codificados ou pseudonimizados,
            mas que possam ser utilizados para reidentificar uma pessoa,
            continuam a ser dados pessoais e são abrangidos pelo âmbito de aplicação do RGPD.{'\n'}

            Dados pessoais que tenham sido tornados anónimos
            de modo a que a pessoa não seja ou deixe de ser identificável
            deixam de ser considerados dados pessoais.
            Para que os dados sejam verdadeiramente anonimizados,
            a anonimização tem de ser irreversível.{'\n'}

            Dados pessoais que tenham sido tornados anónimos
            de modo a que a pessoa não seja ou deixe de ser identificável
            deixam de ser considerados dados pessoais.
            Para que os dados sejam verdadeiramente anonimizados,
            a anonimização tem de ser irreversível.{'\n'}

            Dados pessoais que tenham sido tornados anónimos
            de modo a que a pessoa não seja ou deixe de ser identificável
            deixam de ser considerados dados pessoais.
            Para que os dados sejam verdadeiramente anonimizados,
            a anonimização tem de ser irreversível.
          </Text>
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#000000' : undefined} />
        <Text> Li e aceito</Text>
        {isChecked && (
        <TouchableOpacity style={styles.button} onPress={() => {
          navigator.navigate("Data e Hora")
        }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  containerTexto: {
    flex: 6,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#ffffff',
    overflow: 'scroll'
  },
  texto: {
    fontSize: 20,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:"10%"
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: '#FFFFFF',
    marginLeft:"30%"
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

})
export default Rgpd;
