import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

const MapaEventos = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Mapa de Eventos</Text>
    <Text style={styles.description}>Nesta secção é mostrado o mapa com os últimos 100
                                    eventos ou com os eventos dos últimos 60 dias.
                                    Ao carregar num dos círculos, a página de detalhe é
                                    mostrada.
                                    O tamanho do círculo indica a magnitude do evento.
                                    O código de cores tem a seguinte correspondência:
    </Text>
    <View style={styles.infos}>
        <Image
                source={require("../assets/icon_red.png")}
                style={styles.buttonImage}
                resizeMode="cover"
        />
        <Text style={{marginLeft: '3%'}}>Eventos das últimas 24 horas </Text>
    </View>
    <View style={styles.infos}>
        <Image
                source={require("../assets/icon_orange.png")}
                style={styles.buttonImage}
                resizeMode="cover"
        />
        <Text style={{marginLeft: '3%'}}>Eventos com 1 a 5 dias </Text>
    </View>
    <View style={styles.infos}>
        <Image
                source={require("../assets/icon_yellow.png")}
                style={styles.buttonImage}
                resizeMode="cover"
        />
        <Text style={{marginLeft: '3%'}}>Eventos com mais de 5 dias </Text>
    </View>
    <View style={styles.infos}>
        <Image
                source={require("../assets/icon_yellow_f.png")}
                style={styles.buttonImage}
                resizeMode="cover"
        />
        <Text style={{marginLeft: '3%'}}>Evento sentido</Text>
    </View>
    <View style={styles.infos}>
        <Image
                source={require("../assets/map_marker.png")}
                style={styles.buttonImage}
                resizeMode="cover"
        />
        <Text style={{marginLeft: '3%'}}>Último evento </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '36%',
    marginRight: '5%',
    backgroundColor: '#fff',
    width: '80%',
    marginBottom: '10%',
    overflow: 'scroll'
    
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
  infos: {
    marginTop: '10%',
    flexDirection: 'row'
  },
  buttonImage:{
    width: 20,
    height: 20
  }
});

export default MapaEventos;
