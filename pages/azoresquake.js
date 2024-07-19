import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Azoresquake = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Azores Quake</Text>
    <Text style={styles.description}>Esta aplicação mostra os eventos sísmicos
                                    ocorridos no arquipélago dos Açores. Providencia a
                                    localização, magnitude local e intensidade. Possibilita
                                    a visualização dos eventos numa lista ordenada
                                    cronologicamente ou a sua localização no mapa.
                                    Apenas são exibidos os eventos com magnitude local
                                    superior ou igual a 2, bem como os que, tendo uma
                                    magnitude inferior a 2, são sentidos pela população.
                                    Abaixo estão as opções da barra de ferramentas.
                                    Lista de Eventos
                                    Exibe os últimos 100 eventos ou os eventos dos
                                    últimos 60 dias ordenados cronologicamente.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '36%',
    marginRight: '5%',
    backgroundColor: '#fff',
    width: '80%'
    
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: '10%'
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
  },
});

export default Azoresquake;
