import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const Mapa = () => {
  const navigation = useNavigation();

  const markers = [
    { id: 1, title: 'Marker 1', description: 'This is marker 1', latitude: 38, longitude: -28.2 },
    { id: 2, title: 'Marker 2', description: 'This is marker 2', latitude: 38, longitude: -29.2 },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => {
        navigation.navigate('Inicio');
      }}>
        <Text style={styles.voltarText}>{'< voltar'}</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38,
          longitude: -28.2,
          latitudeDelta: 9,
          longitudeDelta: 9,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
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
    height: '90%',
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
