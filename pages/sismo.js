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
    <View style={styles.container}>
      <MapView
        provider={undefined}
        style={styles.map}
        region={{
          latitude: latitudeNum,
          longitude: longitudeNum,
          latitudeDelta: 5,
          longitudeDelta: 5,
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
      <Voltar style={styles.voltar} iswhite={true} />
      <View style={styles.infoContainerWrapper}>
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
          iswhite={true}
          style={styles.infoContainer}
        />
      </View>
    </View>
  )
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
  infoContainerWrapper: {
    position: 'absolute',
    top: '15%',
    right: '3%',
    left: '3%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Sismo;
