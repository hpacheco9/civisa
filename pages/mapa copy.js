import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

// Assuming OverlayComponent is imported or defined
const OverlayComponent = (props) => (
  <View style={[styles.overlay, props.style]}>
    <Text style={styles.overlayTitleText}>Legenda</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }}>
      <Image
        source={require('../assets/icon_red.png')}
        style={{ width: 15, height: 15, marginRight: '3%' }}
      />
      <Text style={styles.overlayText}>Eventos das últimas 24 horas</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }}>
      <Image
        source={require('../assets/icon_orange.png')}
        style={{ width: 15, height: 15, marginRight: '3%' }}
      />
      <Text style={styles.overlayText}>Eventos com 1 a 5 dias</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }}>
      <Image
        source={require('../assets/icon_yellow.png')}
        style={{ width: 15, height: 15, marginRight: '3%' }}
      />
      <Text style={styles.overlayText}>Eventos com mais de 5 dias</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }}>
      <Image
        source={require('../assets/icon_yellow_f.png')}
        style={{ width: 15, height: 15, marginRight: '3%' }}
      />
      <Text style={styles.overlayText}>Evento sentido</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }}>
      <Image
        source={require('../assets/map_marker.png')}
        style={{ width: 15, height: 15, marginRight: '3%' }}
      />
      <Text style={styles.overlayText}>Último evento</Text>
    </View>
  </View>
);


const Mapa = () => {
  const navigation = useNavigation();

  const markers = [
    { id: 1, latitude: 38, longitude: -28.2 },
    { id: 2, latitude: 38, longitude: -29.2 },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => {
        navigation.navigate('Inicio');
      }}>
        <Text style={styles.voltarText}>{'< voltar'}</Text>
      </TouchableOpacity>
      <MapView
        provider={undefined}
        style={styles.map}
        region={{
          latitude: 38,
          longitude: -28.2,
          latitudeDelta: 9,
          longitudeDelta: 9,
        }}
        mapType='hybrid'
        showsCompass={false}
        rotateEnabled={false}
        toolbarEnabled={false}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            image={require('../assets/map_marker.png')}
            onPress={e => console.log(e.nativeEvent)}
            hideCallout
          />
        ))}
      </MapView>
      <OverlayComponent style={styles.overlayComponent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  voltar: {
    position: 'absolute',
    top: '7%',
    left: '7%',
    zIndex: 1,
  },
  voltarText: {
    fontWeight: 'bold',
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#FFFFFF'
  },
  overlay: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    alignItems: 'left',
  },
  overlayTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  overlayText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#FFFFFF'
  },
  overlayComponent: {
    position: 'absolute',
    top: '7%',
    right: '3%',
    left: '45%',
    padding: 10,
    borderRadius: 10,
  }
});

export default Mapa;
