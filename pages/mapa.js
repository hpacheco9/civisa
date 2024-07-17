import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

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
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "15%"
  },
  map: {
    width: '100%',
    height: '100%',
  },
  voltar: {
    marginBottom: '5%',
    marginLeft: '7%'
  },
  voltarText: {
    fontWeight: 'bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  }
});

export default Mapa;
