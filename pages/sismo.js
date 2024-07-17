import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import InfoContainer from '../components/infoContainer.jsx';
import Voltar from '../components/Voltar.jsx';

const Sismo = ({ route }) => {
  const { latitude, longitude, region, date, time, intensidade, mag, backGround } = route.params;
  const latitudeNum = parseFloat(latitude);
  const longitudeNum = parseFloat(longitude);

  return (
    <>
      <View style={{ marginTop: '20%' }}>
        <Voltar />
      </View>
      <View style={styles.container}>
        <InfoContainer
          data={date}
          time={time}
          region={region}
          mag={mag}
          intensidade={intensidade}
          bg={backGround}
          latitude={latitude}
          longitude={longitude}
          cords={true}
        />
      </View>
      <MapView
        provider={undefined}
        style={styles.map}
        region={{
          latitude: latitudeNum,
          longitude: longitudeNum,
          latitudeDelta: 7,
          longitudeDelta: 7,
        }}
        mapType='hybrid'
        showsCompass={false}
        rotateEnabled={false}
        toolbarEnabled={false}
      >
        <Marker
          coordinate={{ latitude: latitudeNum, longitude: longitudeNum }}
          image={require('../assets/map_marker.png')}
        />
      </MapView>
    </>
  )
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: '20%',
    marginLeft: '5%',
  },
  backButtonText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
  container: {
    alignItems: 'center',
    marginTop: '5%'
  },
  map: {
    flex: 1,
    width: '100%',
    height: '90%'
  },
});

export default Sismo;